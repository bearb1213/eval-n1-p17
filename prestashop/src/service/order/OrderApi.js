import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/orders"

async function getAllOrders() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orders = json.prestashop.orders;
        console.log(orders);

        return orders;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrder(id) {
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

async function getAllIdOrders() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orders = json.prestashop.orders;
        console.log(orders);

        return orders;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrders() {
    try {
        const orders = await getAllIdOrders();
        const ids = Array.isArray(orders.order)
            ? orders.order.map(o => o.id)
            : orders.order && Object.keys(orders.order).length > 0
            ? [orders.order.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteOrder(id);
                console.log(`Deleted order with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function saveOrder(order) {
    try {
        const orderXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                order: order
            }
        });
        // console.log("Order XML:");
        // console.log(orderXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            orderXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.order;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function updateOrder(order) {
    try {
        const orderXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                order: order
            }
        });
        // console.log("Order XML:");
        // console.log(orderXml);
        const result = await ApiAction(
            apiUrl ,
            "PUT" ,
            {},
            orderXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.order;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function patchOrder(order) {
    try {
        const orderXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                order: order
            }
        });
        // console.log("Order XML:");
        // console.log(orderXml);
        const result = await ApiAction(
            apiUrl ,
            "PATCH" ,
            {},
            orderXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.order;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {
    getAllOrders , 
    deleteOrder, 
    getAllIdOrders, 
    deleteAllOrders , 
    saveOrder ,
    updateOrder ,
    patchOrder
};