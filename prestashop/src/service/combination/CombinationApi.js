import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/combinations"

async function getAllCombinations() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const combinations = json.prestashop.combinations.combination;
        // console.log(combinations);

        return Array.isArray(combinations) ? combinations : [combinations];
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCombination(id) {
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

async function getAllIdCombinations() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const combinations = json.prestashop.combinations;
        console.log(combinations);

        return combinations;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCombinations() {
    try {
        const combinations = await getAllIdCombinations();
        const ids = Array.isArray(combinations.combination)
            ? combinations.combination.map(c => c.id)
            : combinations.combination && Object.keys(combinations.combination).length > 0
            ? [combinations.combination.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteCombination(id);
                console.log(`Deleted combination with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting combination with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function saveCombination(combination) {
    try {
        const combinationXml = jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                combination: combination
            }
        });
        // console.log("XML to send: \n");
        // console.log(combinationXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {}, 
            combinationXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.combination;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCombinationIdAndProduct() {
    const result = await ApiAction(
        apiUrl ,
        "GET" ,
        {"display": "full"}
    );
    const json = xmlToJson.parse(result);
    const combinations = json.prestashop.combinations.combination;
    
    return combinations.map(combination => ({
        id: combination.id,
        id_product: combination.id_product,
        associations: combination.associations
    }));
}

export {
    getAllCombinations , 
    deleteCombination , 
    deleteAllCombinations , 
    saveCombination ,
    getCombinationIdAndProduct,
};