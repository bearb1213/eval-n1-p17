    import {ApiAction} from "../util/ApiAction.js";
import {XMLParser ,XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/tax_rule_groups"

async function getAllTaxRuleGroups() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const taxRuleGroups = json.prestashop.tax_rule_groups.tax_rule_group;
        // console.log(taxRuleGroups);

        return Array.isArray(taxRuleGroups) ? taxRuleGroups : [taxRuleGroups];
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteTaxRuleGroup(id) {
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

async function getAllIdTaxRuleGroups() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const taxRuleGroups = json.prestashop.tax_rule_groups;
        console.log(taxRuleGroups);

        return taxRuleGroups;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllTaxRuleGroups() {
    try {
        const taxRuleGroups = await getAllIdTaxRuleGroups();
        const ids = Array.isArray(taxRuleGroups.tax_rule_group)
            ? taxRuleGroups.tax_rule_group.map(trg => trg.id)
            : taxRuleGroups.tax_rule_group && Object.keys(taxRuleGroups.tax_rule_group).length > 0
            ? [taxRuleGroups.tax_rule_group.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteTaxRuleGroup(id);
                console.log(`Deleted tax rule group with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting tax rule group with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function saveTaxRuleGroup(taxRuleGroup) {
    try {
        const taxRuleGroupXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                tax_rule_group: taxRuleGroup
            }
        });

        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            taxRuleGroupXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.tax_rule_group;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getTaxRuleGroupNameAndId() {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[name,id]"}
        );
        const json = xmlToJson.parse(result);
        const taxRuleGroups = json.prestashop.tax_rule_groups.tax_rule_group;
        return taxRuleGroups.map(trg => ({
            id: trg.id,
            name: trg.name,
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export {
    getAllTaxRuleGroups , 
    deleteTaxRuleGroup , 
    deleteAllTaxRuleGroups , 
    saveTaxRuleGroup , 
    getTaxRuleGroupNameAndId
};