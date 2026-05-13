import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder } from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/product_option_values"

export default async function getAllProductOptionValues() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const productOptionValues = json.prestashop.product_option_values;
        console.log(productOptionValues);

        return productOptionValues;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteProductOptionValue(id) {
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

async function getAllIdProductOptionValues() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const productOptionValues = json.prestashop.product_option_values;
        console.log(productOptionValues);

        return productOptionValues;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllProductOptionValues() {
    try {
        const productOptionValues = await getAllIdProductOptionValues();
        const ids = Array.isArray(productOptionValues.product_option_value)
            ? productOptionValues.product_option_value.map(p => p.id)
            : productOptionValues.product_option_value && Object.keys(productOptionValues.product_option_value).length > 0
            ? [productOptionValues.product_option_value.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteProductOptionValue(id);
                console.log(`Deleted product option value with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting product option value with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function saveProductOptionValue(productOptionValue) {
    try {
        const optionValuesXml = jsonToXml.build(
            {
                prestashop: {
                    "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                    product_option_value : productOptionValue
                }
        });
        // console.log("XML to send: \n");
        // console.log(optionValuesXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            optionValuesXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function getProductOptionValueNameAndId() {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id,name,id_attribute_group]"}
        );
        const json = xmlToJson.parse(result);
        const product_option_values = json.prestashop.product_option_values.product_option_value;
        return product_option_values.map(p => ({
            id: p.id,
            name: p.name.language["#text"],
            id_attribute_group: p.id_attribute_group
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { 
    deleteProductOptionValue, 
    getAllIdProductOptionValues, 
    deleteAllProductOptionValues ,
    saveProductOptionValue ,
    getProductOptionValueNameAndId ,
};
