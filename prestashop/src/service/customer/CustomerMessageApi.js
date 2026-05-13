import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/customer_messages"

async function getAllCustomerMessages() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const customerMessages = json.prestashop.customer_messages;
        console.log(customerMessages);

        return customerMessages;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCustomerMessage(id) {
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

async function getAllIdCustomerMessages() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const customerMessages = json.prestashop.customer_messages;
        console.log(customerMessages);

        return customerMessages;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCustomerMessages() {
    try {
        const customerMessages = await getAllIdCustomerMessages();
        const ids = Array.isArray(customerMessages.customer_message)
            ? customerMessages.customer_message.map(cm => cm.id)
            : customerMessages.customer_message && Object.keys(customerMessages.customer_message).length > 0
            ? [customerMessages.customer_message.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteCustomerMessage(id);
                console.log(`Deleted customer message with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting customer message with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllCustomerMessages , deleteCustomerMessage , deleteAllCustomerMessages};