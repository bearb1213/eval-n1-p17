import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/product_options"

export default async function getAllProductOptions() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const productOptions = json.prestashop.product_options;
        console.log(productOptions);

        return productOptions;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteProductOption(id) {
    id = parseInt(id);
    try {
        const result = await ApiAction(
            apiUrl+"/"+id ,
            "DELETE"
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.product_option;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getAllIdProductOptions() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const productOptions = json.prestashop.product_options;
        console.log(productOptions);

        return productOptions;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllProductOptions() {
    try {
        const productOptions = await getAllIdProductOptions();
        const ids = Array.isArray(productOptions.product_option)
            ? productOptions.product_option.map(p => p.id)
            : productOptions.product_option && Object.keys(productOptions.product_option).length > 0
            ? [productOptions.product_option.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteProductOption(id);
                console.log(`Deleted product option with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting product option with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function saveProductOption(productOption) {
    try {
        const optionsXml = jsonToXml.build(
            {
                prestashop: {
                    "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                    product_option: productOption
                }
        });
        // console.log("XML to send: \n");
        // console.log(optionsXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            optionsXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.product_option;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function getProductOptionNameAndId() {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id,name]"}
        );
        const json = xmlToJson.parse(result);
        const product_options = json.prestashop.product_options.product_option;
        return product_options.map(p => ({
            id: p.id,
            name: p.name.language["#text"],
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { 
    deleteProductOption, 
    getAllIdProductOptions, 
    deleteAllProductOptions,
    saveProductOption , 
    getProductOptionNameAndId ,
};
