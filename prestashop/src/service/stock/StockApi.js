import {ApiAction} from "../util/ApiAction.js";
import {XMLParser, XMLBuilder} from "fast-xml-parser";


const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/stocks"

async function getAllStock() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const stock_mvts = (json.prestashop.stocks.stock);
        // console.log(stock_mvts);
        return stock_mvts;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function saveStock(stock) {
    try {
        const stockXml = jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                stock: stock,
            }
        });
        console.log("Stock XML:", stockXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            stockXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.stock;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    saveStock,
    getAllStock,
}