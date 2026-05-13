import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/cart_rules"

async function getAllCartRules() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const cart_rules = json.prestashop.cart_rules;
        console.log(cart_rules);

        return cart_rules;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCartRule(id) {
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

async function getAllIdCartRules() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const cart_rules = json.prestashop.cart_rules;
        console.log(cart_rules);

        return cart_rules;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCartRules() {
    try {
        const cart_rules = await getAllIdCartRules();
        const ids = Array.isArray(cart_rules.cart_rule)
            ? cart_rules.cart_rule.map(cr => cr.id)
            : cart_rules.cart_rule && Object.keys(cart_rules.cart_rule).length > 0
            ? [cart_rules.cart_rule.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteCartRule(id);
                console.log(`Deleted cart rule with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting cart rule with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {getAllCartRules , deleteCartRule, getAllIdCartRules, deleteAllCartRules};