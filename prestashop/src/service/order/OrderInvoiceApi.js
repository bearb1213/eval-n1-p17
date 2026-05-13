import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/order_invoices"

async function getAllOrderInvoices() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderInvoices = json.prestashop.order_invoices;
        console.log(orderInvoices);

        return orderInvoices;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrderInvoice(id) {
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

async function getAllIdOrderInvoices() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderInvoices = json.prestashop.order_invoices;
        console.log(orderInvoices);

        return orderInvoices;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrderInvoices() {
    try {
        const orderInvoices = await getAllIdOrderInvoices();
        const ids = Array.isArray(orderInvoices.order_invoice)
            ? orderInvoices.order_invoice.map(oi => oi.id)
            : orderInvoices.order_invoice && Object.keys(orderInvoices.order_invoice).length > 0
            ? [orderInvoices.order_invoice.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteOrderInvoice(id);
                console.log(`Deleted order invoice with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order invoice with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllOrderInvoices , deleteOrderInvoice, getAllIdOrderInvoices, deleteAllOrderInvoices};