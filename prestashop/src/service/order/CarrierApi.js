import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/carriers"

async function getAllCarriers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const carriers = json.prestashop.carriers;
        console.log(carriers);

        return carriers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCarrier(id) {
    id = parseInt(id);
    if(id == 1 || id=="1" ){
        throw new Error("Can't delete carrier with id "+id);
    }
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

async function getAllIdCarriers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const carriers = json.prestashop.carriers;
        console.log(carriers);

        return carriers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCarriers() {
    try {
        const carriers = await getAllIdCarriers();
        const ids = Array.isArray(carriers.carrier)
            ? carriers.carrier.map(c => c.id)
            : carriers.carrier && Object.keys(carriers.carrier).length > 0
            ? [carriers.carrier.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            if(id == 1 || id=="1"){
                console.log("Skipping deletion of carrier with id "+id);
                continue;
            }
            try {
                const rep = await deleteCarrier(id);
                console.log(`Deleted carrier with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting carrier with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllCarriers , deleteCarrier, getAllIdCarriers, deleteAllCarriers};