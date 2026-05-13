import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/specific_prices"

async function getAllSpecificPrices() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const specificPrices = json.prestashop.specific_prices;
        console.log(specificPrices);

        return specificPrices;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteSpecificPrice(id) {
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

async function getAllIdSpecificPrices() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const specificPrices = json.prestashop.specific_prices;
        console.log(specificPrices);

        return specificPrices;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllSpecificPrices() {
    try {
        const specificPrices = await getAllIdSpecificPrices();
        const ids = Array.isArray(specificPrices.specific_price)
            ? specificPrices.specific_price.map(sp => sp.id)
            : specificPrices.specific_price && Object.keys(specificPrices.specific_price).length > 0
            ? [specificPrices.specific_price.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteSpecificPrice(id);
                console.log(`Deleted specific price with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting specific price with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllSpecificPrices , deleteSpecificPrice , deleteAllSpecificPrices};