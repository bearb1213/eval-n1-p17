import {ApiAction} from "../util/ApiAction.js";
import {XMLParser, XMLBuilder} from "fast-xml-parser";


const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/stock_movements"

async function getAllStockMouvement() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const stock_mvts = (json.prestashop.stock_mvts.stock_mvt);
        // console.log(stock_mvts);
        return stock_mvts;
    } catch (e) {
        console.log(e)
        throw e;
    }
}
async function getStockMouvementPositif(){
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {
            "display":"full",
            "filter[sign]":"1"
        }
        );
        const json = xmlToJson.parse(result);
        const stock_mvts = (json.prestashop.stock_mvts.stock_mvt);
        // console.log(stock_mvts);
        return stock_mvts;
    } catch (e) {
        console.log(e)
        throw e;
    }
}
async function deleteStockMouvement(id) {
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
async function getAllIdStockMovements() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const stock_mvts = json.prestashop.stock_mvts;
        console.log(stock_mvts);

        return stock_mvts;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllStockMovements() {
    try {
        const stock_mvts = await getAllIdStockMovements();
        const ids = Array.isArray(stock_mvts.stock_mvt)
            ? stock_mvts.stock_mvt.map(s => s.id)
            : stock_mvts.stock_mvt && Object.keys(stock_mvts.stock_mvt).length > 0
            ? [stock_mvts.stock_mvt.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteStockMouvement(id);
                console.log(`Deleted stock movement with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting stock movement with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function saveStockMouvement(stockMouvement) {
    try {
        const stockMouvementXml = jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                stock_mvt: stockMouvement,
            }
        });
        // console.log("Stock Movement XML:", stockMouvementXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            stockMouvementXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.stock_mvt;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function patchStockMouvement(stockMouvement) {
    try {
        const stockMouvementXml = jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                stock_mvt: stockMouvement,
            }
        });
        // console.log("Stock Movement XML:", stockMouvementXml);
        const result = await ApiAction(
            apiUrl ,
            "PATCH" ,
            {},
            stockMouvementXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.stock_mvt;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getStockMouvementByIdStock(id) {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {
                "filter[id_stock]": id,
                "display":"full"
            }
        );
        const json = xmlToJson.parse(result);
        const stock_mvts = (json.prestashop.stock_mvts.stock_mvt);
        console.log("mouvemnt stock : ",stock_mvts);
        return Array.isArray(stock_mvts) ? stock_mvts : [stock_mvts];
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export {
    saveStockMouvement,
    patchStockMouvement,
    getAllStockMouvement,
    getStockMouvementPositif,
    deleteAllStockMovements,
    getStockMouvementByIdStock,
    deleteStockMouvement,
}