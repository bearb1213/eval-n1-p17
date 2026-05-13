import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/product_feature_values"

export default async function getAllProductFeatureValues() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const productFeatureValues = json.prestashop.product_feature_values;
        console.log(productFeatureValues);

        return productFeatureValues;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteProductFeatureValue(id) {
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

async function getAllIdProductFeatureValues() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const productFeatureValues = json.prestashop.product_feature_values;
        console.log(productFeatureValues);

        return productFeatureValues;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllProductFeatureValues() {
    try {
        const productFeatureValues = await getAllIdProductFeatureValues();
        const ids = Array.isArray(productFeatureValues.product_feature_value)
            ? productFeatureValues.product_feature_value.map(p => p.id)
            : productFeatureValues.product_feature_value && Object.keys(productFeatureValues.product_feature_value).length > 0
            ? [productFeatureValues.product_feature_value.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteProductFeatureValue(id);
                console.log(`Deleted product feature value with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting product feature value with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export { deleteProductFeatureValue, getAllIdProductFeatureValues, deleteAllProductFeatureValues };
