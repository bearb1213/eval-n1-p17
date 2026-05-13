import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/order_payments"

async function getAllOrderPayments() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderPayments = json.prestashop.order_payments;
        console.log(orderPayments);

        return orderPayments;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrderPayment(id) {
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

async function getAllIdOrderPayments() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderPayments = json.prestashop.order_payments;
        console.log(orderPayments);

        return orderPayments;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrderPayments() {
    try {
        const orderPayments = await getAllIdOrderPayments();
        const ids = Array.isArray(orderPayments.order_payment)
            ? orderPayments.order_payment.map(op => op.id)
            : orderPayments.order_payment && Object.keys(orderPayments.order_payment).length > 0
            ? [orderPayments.order_payment.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteOrderPayment(id);
                console.log(`Deleted order payment with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order payment with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllOrderPayments , deleteOrderPayment, getAllIdOrderPayments, deleteAllOrderPayments};