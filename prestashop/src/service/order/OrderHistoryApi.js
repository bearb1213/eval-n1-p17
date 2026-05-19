import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/order_histories"

async function getAllOrderHistories() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderHistories = json.prestashop.order_histories;
        console.log(orderHistories);

        return orderHistories;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrderHistory(id) {
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

async function getAllIdOrderHistories() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderHistories = json.prestashop.order_histories;
        // console.log(orderHistories);

        return orderHistories;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrderHistories() {
    try {
        const orderHistories = await getAllIdOrderHistories();
        const ids = Array.isArray(orderHistories.order_history)
            ? orderHistories.order_history.map(oh => oh.id)
            : orderHistories.order_history && Object.keys(orderHistories.order_history).length > 0
            ? [orderHistories.order_history.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {   
                const rep = await deleteOrderHistory(id);
                console.log(`Deleted order history with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order history with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function saveOrderHistory(orderHistory) {
    try {
        const orderHistoryXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                // order_history: orderHistory
                order_state_update : orderHistory
            }
        });
        // console.log("Order History XML:");
        // console.log(orderHistoryXml);
        const url = "/order_state_update";
        const result = await ApiAction(
            // apiUrl ,
            url,
            "POST" ,
            {},
            orderHistoryXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.order_history;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {
    getAllOrderHistories , 
    deleteOrderHistory, 
    getAllIdOrderHistories, 
    deleteAllOrderHistories ,
    saveOrderHistory , 

};