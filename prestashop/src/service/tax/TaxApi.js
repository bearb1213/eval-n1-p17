import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/taxes"

async function getAllTaxes() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const taxes = json.prestashop.taxes.tax;
        // console.log(taxes);

        return Array.isArray(taxes) ? taxes : [taxes];
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteTax(id) {
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

async function getAllIdTaxes() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const taxes = json.prestashop.taxes;
        console.log(taxes);

        return taxes;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllTaxes() {
    try {
        const taxes = await getAllIdTaxes();
        const ids = taxes && Array.isArray(taxes.tax)
            ? taxes.tax.map(t => t.id)
            : taxes && taxes.tax && Object.keys(taxes.tax).length > 0
            ? [taxes.tax.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteTax(id);
                console.log(`Deleted tax with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting tax with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function saveTax(tax) {
    try {
        const taxXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                tax: tax
            }
        });
      
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            taxXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.tax;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getTaxNameAndId() {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[name,id]"}
        );
        const json = xmlToJson.parse(result);
        const taxes = json.prestashop.taxes.tax;
        return taxes.map(t => ({
            id: t.id,
            name: t.name.language["#text"],
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export {
        getAllTaxes , 
        deleteTax , 
        deleteAllTaxes, 
        saveTax, 
        getTaxNameAndId
    };