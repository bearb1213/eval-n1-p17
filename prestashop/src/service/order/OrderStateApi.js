import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/order_states"

async function getAllOrderStates() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const orderStates = json.prestashop.order_states.order_state;
        // console.log(orderStates);

        return orderStates;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function getAllIdOrderStates() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const orderStates = json.prestashop.order_states.order_state;
        console.log(orderStates);

        return orderStates;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export {getAllOrderStates , getAllIdOrderStates};