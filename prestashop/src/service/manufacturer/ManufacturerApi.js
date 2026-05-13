import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/manufacturers"

async function getAllManufacturers() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const manufacturers = json.prestashop.manufacturers;
        console.log(manufacturers);

        return manufacturers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteManufacturer(id) {
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

async function getAllIdManufacturers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const manufacturers = json.prestashop.manufacturers;
        console.log(manufacturers);

        return manufacturers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllManufacturers() {
    try {
        const manufacturers = await getAllIdManufacturers();
        const ids = Array.isArray(manufacturers.manufacturer)
            ? manufacturers.manufacturer.map(m => m.id)
            : manufacturers.manufacturer && Object.keys(manufacturers.manufacturer).length > 0
            ? [manufacturers.manufacturer.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteManufacturer(id);
                console.log(`Deleted manufacturer with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting manufacturer with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllManufacturers , deleteManufacturer , deleteAllManufacturers};