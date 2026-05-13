import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/order_slip"

async function getAllOrderSlips() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderSlips = json.prestashop.order_slips;
        console.log(orderSlips);

        return orderSlips;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrderSlip(id) {
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

async function getAllIdOrderSlips() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderSlips = json.prestashop.order_slips;
        console.log(orderSlips);

        return orderSlips;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrderSlips() {
    try {
        const orderSlips = await getAllIdOrderSlips();
        const ids = Array.isArray(orderSlips.order_slip)
            ? orderSlips.order_slip.map(os => os.id)
            : orderSlips.order_slip && Object.keys(orderSlips.order_slip).length > 0
            ? [orderSlips.order_slip.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteOrderSlip(id);
                console.log(`Deleted order slip with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order slip with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllOrderSlips , deleteOrderSlip, getAllIdOrderSlips, deleteAllOrderSlips};