import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/tags"

async function getAllTags() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const tags = json.prestashop.tags;
        console.log(tags);

        return tags;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteTag(id) {
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

async function getAllIdTags() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const tags = json.prestashop.tags;
        console.log(tags);

        return tags;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllTags() {
    try {
        const tags = await getAllIdTags();
        const ids = Array.isArray(tags.tag)
            ? tags.tag.map(t => t.id)
            : tags.tag && Object.keys(tags.tag).length > 0
            ? [tags.tag.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteTag(id);
                console.log(`Deleted tag with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting tag with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllTags , deleteTag , deleteAllTags};