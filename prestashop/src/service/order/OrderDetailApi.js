import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/order_details"

async function getAllOrderDetails() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderDetails = json.prestashop.order_details;
        console.log(orderDetails);

        return orderDetails;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrderDetail(id) {
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

async function getAllIdOrderDetails() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderDetails = json.prestashop.order_details;
        console.log(orderDetails);

        return orderDetails;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrderDetails() {
    try {
        const orderDetails = await getAllIdOrderDetails();
        const ids = Array.isArray(orderDetails.order_detail)
            ? orderDetails.order_detail.map(od => od.id)
            : orderDetails.order_detail && Object.keys(orderDetails.order_detail).length > 0
            ? [orderDetails.order_detail.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteOrderDetail(id);
                console.log(`Deleted order detail with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order detail with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllOrderDetails , deleteOrderDetail, getAllIdOrderDetails, deleteAllOrderDetails};