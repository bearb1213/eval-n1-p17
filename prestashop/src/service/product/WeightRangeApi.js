import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/weight_ranges"

async function getAllWeightRanges() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const weightRanges = json.prestashop.weight_ranges;
        console.log(weightRanges);

        return weightRanges;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteWeightRange(id) {
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

async function getAllIdWeightRanges() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const weightRanges = json.prestashop.weight_ranges;
        console.log(weightRanges);

        return weightRanges;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllWeightRanges() {
    try {
        const weightRanges = await getAllIdWeightRanges();
        const ids = Array.isArray(weightRanges.weight_range)
            ? weightRanges.weight_range.map(wr => wr.id)
            : weightRanges.weight_range && Object.keys(weightRanges.weight_range).length > 0
            ? [weightRanges.weight_range.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteWeightRange(id);
                console.log(`Deleted weight range with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting weight range with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllWeightRanges , deleteWeightRange , deleteAllWeightRanges};