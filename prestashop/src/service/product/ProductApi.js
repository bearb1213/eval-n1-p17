import {ApiAction} from "../util/ApiAction.js";
import {XMLParser, XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/products"

export default async function getAllProducts() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const products = (json.prestashop.products);
        console.log(products);

        return products;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteProduct(id) {
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

async function getAllIdProducts() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const products = json.prestashop.products;
        console.log(products);

        return products;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllProducts() {
    try {
        const products = await getAllIdProducts();
        const ids = Array.isArray(products.product)
            ? products.product.map(p => p.id)
            : products.product && Object.keys(products.product).length > 0
            ? [products.product.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteProduct(id);
                console.log(`Deleted product with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting product with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function saveProduct(product) {
    try {
        const productXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                product: product
            }
        });
        // console.log("XML to send: \n");
        // console.log(productXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            productXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getProductNameAndId() {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[name,id]"}
        );
        const json = xmlToJson.parse(result);
        const products = json.prestashop.products.product;
        return products.map(p => ({
            id: p.id,
            name: p.name.language["#text"],
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export { 
    deleteProduct, 
    getAllIdProducts, 
    deleteAllProducts ,
    saveProduct ,
    getProductNameAndId
};
