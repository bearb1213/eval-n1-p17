import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/attachments"

async function getAllAttachments() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const attachments = json.prestashop.attachments;
        console.log(attachments);

        return attachments;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAttachment(id) {
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

async function getAllIdAttachments() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const attachments = json.prestashop.attachments;
        console.log(attachments);

        return attachments;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllAttachments() {
    try {
        const attachments = await getAllIdAttachments();
        const ids = Array.isArray(attachments.attachment)
            ? attachments.attachment.map(a => a.id)
            : attachments.attachment && Object.keys(attachments.attachment).length > 0
            ? [attachments.attachment.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteAttachment(id);
                console.log(`Deleted attachment with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting attachment with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllAttachments , deleteAttachment , deleteAllAttachments};