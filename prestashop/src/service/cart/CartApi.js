import {ApiAction} from "../util/ApiAction.js";
import {XMLParser,XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/carts"

async function getAllCarts() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const carts = json.prestashop.carts;
        console.log(carts);

        return carts;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCart(id) {
    id = parseInt(id);
    try {
        const result = await ApiAction(
            apiUrl+"/"+id ,
            "DELETE"
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.cart;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getAllIdCarts() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const carts = json.prestashop.carts;
        console.log(carts);

        return carts;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCarts() {
    try {
        const carts = await getAllIdCarts();
        const ids = Array.isArray(carts.cart)
            ? carts.cart.map(c => c.id)
            : carts.cart && Object.keys(carts.cart).length > 0
            ? [carts.cart.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteCart(id);
                console.log(`Deleted cart with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting cart with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function saveCart(cart){
    try {
        const cartXml = jsonToXml.build(
            {
                prestashop: {
                    "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                    cart: cart
                }
            }
        );
        // console.log("XML to send : \n");
        // console.log(cartXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            cartXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.cart;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function getCartDisplayFull(){
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const carts = json.prestashop.carts.cart;
        // console.log(carts);

        return carts;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export {
    getAllCarts , 
    deleteCart, 
    getAllIdCarts, 
    deleteAllCarts,
    saveCart,
    getCartDisplayFull,
};