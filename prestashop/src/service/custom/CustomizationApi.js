import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/customizations"

async function getAllCustomizations() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const customizations = json.prestashop.customizations;
        console.log(customizations);

        return customizations;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCustomization(id) {
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

async function getAllIdCustomizations() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const customizations = json.prestashop.customizations;
        console.log(customizations);

        return customizations;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCustomizations() {
    try {
        const customizations = await getAllIdCustomizations();
        const ids = Array.isArray(customizations.customization)
            ? customizations.customization.map(c => c.id)
            : customizations.customization && Object.keys(customizations.customization).length > 0
            ? [customizations.customization.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteCustomization(id);
                console.log(`Deleted customization with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting customization with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllCustomizations , deleteCustomization , deleteAllCustomizations};