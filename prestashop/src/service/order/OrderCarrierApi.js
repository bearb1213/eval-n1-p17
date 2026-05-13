import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/order_carriers"

async function getAllOrderCarriers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderCarriers = json.prestashop.order_carriers;
        console.log(orderCarriers);

        return orderCarriers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrderCarrier(id) {
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

async function getAllIdOrderCarriers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderCarriers = json.prestashop.order_carriers;
        console.log(orderCarriers);

        return orderCarriers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrderCarriers() {
    try {
        const orderCarriers = await getAllIdOrderCarriers();
        const ids = Array.isArray(orderCarriers.order_carrier)
            ? orderCarriers.order_carrier.map(oc => oc.id)
            : orderCarriers.order_carrier && Object.keys(orderCarriers.order_carrier).length > 0
            ? [orderCarriers.order_carrier.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteOrderCarrier(id);
                console.log(`Deleted order carrier with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order carrier with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllOrderCarriers , deleteOrderCarrier, getAllIdOrderCarriers, deleteAllOrderCarriers};