import {ApiAction} from "../util/ApiAction.js";
import {XMLParser, XMLBuilder} from "fast-xml-parser";


const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/stock_availables"


async function getAllStockAvailable() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const stockAvailable = (json.prestashop.stock_availables.stock_available);
        // console.log(stockAvailable);
        return stockAvailable;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function getStockAvailableByIdProductAndIdAttribute(id_product, id_attribute=0) {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {
                "filter[id_product]": id_product, 
                "filter[id_product_attribute]": id_attribute ,
                "display":"full"
            }
        );
        const json = xmlToJson.parse(result);
        const stockAvailable = (json.prestashop.stock_availables.stock_available);
        // console.log(stockAvailable);
        return stockAvailable;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateStockAvailable(id, stockAvailable) {
    try {
        const stockAvailableXml = jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                stock_available: stockAvailable,
            }
        });
        // console.log("Stock Available XML:", stockAvailableXml);
        const result = await ApiAction(
            apiUrl+"/"+id ,
            "PUT" ,
            {},
            stockAvailableXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.stock_available;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    getAllStockAvailable, 
    getStockAvailableByIdProductAndIdAttribute, 
    updateStockAvailable
}; 