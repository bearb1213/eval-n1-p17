import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/suppliers"

async function getAllSuppliers() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const suppliers = json.prestashop.suppliers;
        console.log(suppliers);

        return suppliers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteSupplier(id) {
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

async function getAllIdSuppliers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const suppliers = json.prestashop.suppliers;
        console.log(suppliers);

        return suppliers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllSuppliers() {
    try {
        const suppliers = await getAllIdSuppliers();
        const ids = Array.isArray(suppliers.supplier)
            ? suppliers.supplier.map(s => s.id)
            : suppliers.supplier && Object.keys(suppliers.supplier).length > 0
            ? [suppliers.supplier.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteSupplier(id);
                console.log(`Deleted supplier with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting supplier with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllSuppliers , deleteSupplier , deleteAllSuppliers};