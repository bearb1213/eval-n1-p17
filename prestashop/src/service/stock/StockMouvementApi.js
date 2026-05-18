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
        console.log("Stock Movement XML:", stockMouvementXml);
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
    getStockMouvementByIdStock,
}