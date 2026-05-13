import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/order_cart_rules"

async function getAllOrderCartRules() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderCartRules = json.prestashop.order_cart_rules;
        console.log(orderCartRules);

        return orderCartRules;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteOrderCartRule(id) {
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

async function getAllIdOrderCartRules() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderCartRules = json.prestashop.order_cart_rules;
        console.log(orderCartRules);

        return orderCartRules;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllOrderCartRules() {
    try {
        const orderCartRules = await getAllIdOrderCartRules();
        const ids = Array.isArray(orderCartRules.order_cart_rule)
            ? orderCartRules.order_cart_rule.map(ocr => ocr.id)
            : orderCartRules.order_cart_rule && Object.keys(orderCartRules.order_cart_rule).length > 0
            ? [orderCartRules.order_cart_rule.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteOrderCartRule(id);
                console.log(`Deleted order cart rule with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting order cart rule with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllOrderCartRules , deleteOrderCartRule, getAllIdOrderCartRules, deleteAllOrderCartRules};