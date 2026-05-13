import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/product_features"

export default async function getAllProductFeatures() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const productFeatures = json.prestashop.product_features;
        console.log(productFeatures);

        return productFeatures;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteProductFeature(id) {
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

async function getAllIdProductFeatures() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const productFeatures = json.prestashop.product_features;
        console.log(productFeatures);

        return productFeatures;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllProductFeatures() {
    try {
        const productFeatures = await getAllIdProductFeatures();
        const ids = Array.isArray(productFeatures.product_feature)
            ? productFeatures.product_feature.map(p => p.id)
            : productFeatures.product_feature && Object.keys(productFeatures.product_feature).length > 0
            ? [productFeatures.product_feature.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteProductFeature(id);
                console.log(`Deleted product feature with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting product feature with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export { deleteProductFeature, getAllIdProductFeatures, deleteAllProductFeatures };
