import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/messages"

async function getAllMessages() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const messages = json.prestashop.messages;
        console.log(messages);

        return messages;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteMessage(id) {
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

async function getAllIdMessages() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const messages = json.prestashop.messages;
        console.log(messages);

        return messages;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllMessages() {
    try {
        const messages = await getAllIdMessages();
        const ids = Array.isArray(messages.message)
            ? messages.message.map(m => m.id)
            : messages.message && Object.keys(messages.message).length > 0
            ? [messages.message.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteMessage(id);
                console.log(`Deleted message with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting message with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllMessages , deleteMessage , deleteAllMessages};