import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/price_ranges"

async function getAllPriceRanges() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const priceRanges = json.prestashop.price_ranges;
        console.log(priceRanges);

        return priceRanges;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deletePriceRange(id) {
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

async function getAllIdPriceRanges() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const priceRanges = json.prestashop.price_ranges;
        console.log(priceRanges);

        return priceRanges;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllPriceRanges() {
    try {
        const priceRanges = await getAllIdPriceRanges();
        const ids = Array.isArray(priceRanges.price_range)
            ? priceRanges.price_range.map(pr => pr.id)
            : priceRanges.price_range && Object.keys(priceRanges.price_range).length > 0
            ? [priceRanges.price_range.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deletePriceRange(id);
                console.log(`Deleted price range with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting price range with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllPriceRanges , deletePriceRange , deleteAllPriceRanges};