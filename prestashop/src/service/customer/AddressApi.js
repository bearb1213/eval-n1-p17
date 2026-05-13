import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/addresses"

async function getAllAddresses() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const addresses = json.prestashop.addresses;
        console.log(addresses);

        return addresses;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAddress(id) {
    id = parseInt(id);
    if (id == 1 || id=="1" ){
        throw new Error("Can't delete address with id "+id);
    }
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

async function getAllIdAddresses() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const addresses = json.prestashop.addresses;
        console.log(addresses);

        return addresses;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllAddresses() {
    try {
        const addresses = await getAllIdAddresses();
        const ids = Array.isArray(addresses.address)
            ? addresses.address.map(a => a.id)
            : addresses.address && Object.keys(addresses.address).length > 0
            ? [addresses.address.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            if (id == 1 || id=="1" ){
                console.log("Skipping deletion of address with id "+id);
                continue;
            }
            try {
                const rep = await deleteAddress(id);
                console.log(`Deleted address with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting address with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
export {getAllAddresses , deleteAddress , deleteAllAddresses};