import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/product_customization_fields"

export default async function getAllProductCustomizationFields() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const productCustomizationFields = json.prestashop.product_customization_fields;
        console.log(productCustomizationFields);

        return products;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteProductCustomizationField(id) {
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

async function getAllIdProductCustomizationFields() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const productCustomizationFields = json.prestashop.product_customization_fields;
        console.log(productCustomizationFields);

        return products;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllProductCustomizationFields() {
    try {
        const productCustomizationFields = await getAllIdProductCustomizationFields();
        const ids = Array.isArray(productCustomizationFields.product_customization_field)
            ? productCustomizationFields.product_customization_field.map(p => p.id)
            : productCustomizationFields.product_customization_field && Object.keys(productCustomizationFields.product_customization_field).length > 0
            ? [productCustomizationFields.product_customization_field.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteProductCustomizationField(id);
                console.log(`Deleted product customization field with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting product customization field with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export { deleteProductCustomizationField, getAllIdProductCustomizationFields, deleteAllProductCustomizationFields };
