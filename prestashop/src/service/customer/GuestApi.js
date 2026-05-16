import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/guests"

async function getAllGuests() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const guests = json.prestashop.guests;
        console.log(guests);

        return guests;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteGuest(id) {
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

async function getAllIdGuests() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const guests = json.prestashop.guests;
        console.log(guests);

        return guests;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllGuests() {
    try {
        const guests = await getAllIdGuests();
        const ids = Array.isArray(guests.guest)
            ? guests.guest.map(g => g.id)
            : guests.guest && Object.keys(guests.guest).length > 0
            ? [guests.guest.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            try {
                const rep = await deleteGuest(id);
                console.log(`Deleted guest with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting guest with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function saveGuest(guest) {
    try {
        const guestXml = jsonToXml.build(
            {
                prestashop: {
                    "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                    guest: guest
                }
            }
        );
        // console.log("XML to send : \n");
        // console.log(guestXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {} ,
            guestXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.guest;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export {
    getAllGuests , 
    deleteGuest, 
    getAllIdGuests, 
    deleteAllGuests,
    saveGuest
};