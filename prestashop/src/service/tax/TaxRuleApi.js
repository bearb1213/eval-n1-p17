import {ApiAction} from "../util/ApiAction.js";
import {XMLParser,XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/tax_rules"

async function getAllTaxRules() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const taxRules = json.prestashop.tax_rules.tax_rule;
        // console.log(taxRules);

        return Array.isArray(taxRules) ? taxRules : [taxRules];
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteTaxRule(id) {
    id = parseInt(id);
    try {
        const result = await ApiAction(
            apiUrl+"/"+id ,
            "DELETE"
        );
        const json = xmlToJson.parse(result);
        return json.prestashop;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getAllIdTaxRules() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const taxRules = json.prestashop.tax_rules;
        console.log(taxRules);

        return taxRules;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllTaxRules() {
    try {
        const taxRules = await getAllIdTaxRules();
        const ids = taxRules ? (Array.isArray(taxRules.tax_rule)
            ? taxRules.tax_rule.map(tr => tr.id)
            : taxRules.tax_rule && Object.keys(taxRules.tax_rule).length > 0
            ? [taxRules.tax_rule.id]
            : []) : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteTaxRule(id);
                console.log(`Deleted tax rule with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting tax rule with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}


async function saveTaxRule(taxRule) {
    try {
        const taxRuleXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                tax_rule: taxRule
            }
        });

        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            taxRuleXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.tax_rule;
    } catch (e) {
        console.log(e);
        throw e;
    }
}



export {
    getAllTaxRules , 
    deleteTaxRule , 
    deleteAllTaxRules , 
    saveTaxRule ,
};