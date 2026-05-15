import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/customers"

async function getAllCustomers() {
    try{
        const result = await ApiAction(
            apiUrl ,
        "GET" ,
        {"display":"full"}
        );
        const json = xmlToJson.parse(result);
        const customers = json.prestashop.customers.customer;
        console.log(customers);

        return Array.isArray(customers) ? customers : customers ? [customers] : [];
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCustomer(id) {
    id = parseInt(id);
    if (id == 1 || id=="1" ){
        throw new Error("Can't delete customer with id "+id);
    }
    try {
        const result = await ApiAction(
            apiUrl+"/"+id ,
            "DELETE"
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.customer;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getAllIdCustomers() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const customers = json.prestashop.customers;
        console.log(customers);

        return customers;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCustomers() {
    try {
        const customers = await getAllIdCustomers();
        const ids = Array.isArray(customers.customer)
            ? customers.customer.map(c => c.id)
            : customers.customer && Object.keys(customers.customer).length > 0
            ? [customers.customer.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            if (id == 1 || id=="1" ){
                console.log("Skipping deletion of customer with id "+id);
                continue;
            }
            try {
                const rep = await deleteCustomer(id);
                console.log(`Deleted customer with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting customer with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function saveCustomer(customer) {
    try {
        const customerXml = jsonToXml.build(
            {
                prestashop: {
                    "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                    customer: customer
                }
            }
        );
        // console.log("XML to send : \n");
        // console.log(customerXml);
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {} ,
            customerXml
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.customer;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
async function getProductEmailAndId(){
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id,email]"}
        )
        const json = xmlToJson.parse(result);
        const customers = json.prestashop.customers.customer;
        return customers;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    getAllCustomers , 
    deleteCustomer , 
    deleteAllCustomers , 
    saveCustomer ,
    getProductEmailAndId
};