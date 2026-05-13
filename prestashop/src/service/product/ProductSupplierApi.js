import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/product_suppliers"

export default async function getAllProductSuppliers() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const productSuppliers = json.prestashop.product_suppliers;
        console.log(productSuppliers);

        return productSuppliers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteProductSupplier(id) {
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

async function getAllIdProductSuppliers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const productSuppliers = json.prestashop.product_suppliers;
        console.log(productSuppliers);

        return productSuppliers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllProductSuppliers() {
    try {
        const productSuppliers = await getAllIdProductSuppliers();
        const ids = Array.isArray(productSuppliers.product_supplier)
            ? productSuppliers.product_supplier.map(p => p.id)
            : productSuppliers.product_supplier && Object.keys(productSuppliers.product_supplier).length > 0
            ? [productSuppliers.product_supplier.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteProductSupplier(id);
                console.log(`Deleted product supplier with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting product supplier with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export { deleteProductSupplier, getAllIdProductSuppliers, deleteAllProductSuppliers };
