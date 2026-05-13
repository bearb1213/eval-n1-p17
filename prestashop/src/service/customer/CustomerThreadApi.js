import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/customer_threads"

async function getAllCustomerThreads() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const customerThreads = json.prestashop.customer_threads;
        console.log(customerThreads);

        return customerThreads;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCustomerThread(id) {
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

async function getAllIdCustomerThreads() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const customerThreads = json.prestashop.customer_threads;
        console.log(customerThreads);

        return customerThreads;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCustomerThreads() {
    try {
        const customerThreads = await getAllIdCustomerThreads();
        const ids = Array.isArray(customerThreads.customer_thread)
            ? customerThreads.customer_thread.map(ct => ct.id)
            : customerThreads.customer_thread && Object.keys(customerThreads.customer_thread).length > 0
            ? [customerThreads.customer_thread.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteCustomerThread(id);
                console.log(`Deleted customer thread with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting customer thread with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllCustomerThreads , deleteCustomerThread , deleteAllCustomerThreads};