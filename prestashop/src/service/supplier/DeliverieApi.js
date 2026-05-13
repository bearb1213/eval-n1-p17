import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/deliveries"

async function getAllDeliveries() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const deliveries = json.prestashop.deliveries;
        console.log(deliveries);

        return deliveries;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteDelivery(id) {
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

async function getAllIdDeliveries() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const deliveries = json.prestashop.deliveries;
        console.log(deliveries);

        return deliveries;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllDeliveries() {
    try {
        const deliveries = await getAllIdDeliveries();
        const ids = Array.isArray(deliveries.delivery)
            ? deliveries.delivery.map(d => d.id)
            : deliveries.delivery && Object.keys(deliveries.delivery).length > 0
            ? [deliveries.delivery.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteDelivery(id);
                console.log(`Deleted delivery with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting delivery with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllDeliveries , deleteDelivery , deleteAllDeliveries};