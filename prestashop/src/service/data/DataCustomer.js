import {saveCustomer } from "../customer/CustomerApi";

const colDate = "date";
const colNom = "nom";
const colEmail = "email";
const colPwd = "pwd";
const colAdresse = "adresse";
const colAchat = "achat";
const colEtat = "etat";
async function getCustomers(file) {
    const customers = await createCustomers(file);
    const customersWithId = await saveCustomers(customers);
    return customersWithId;
}
async function createCustomers(file) {
    const customers = file.map(
        item => {
            return {
                lastname: item[colNom],
                firstname: item[colNom],
                email: item[colEmail],
                passwd: item[colPwd]
            }
        }
    );
    const uniqueCustomers = [];
    const seenEmails = new Set();
    for (const customer of customers) {
        if (!seenEmails.has(customer.email)) {
            uniqueCustomers.push(customer);
            seenEmails.add(customer.email);
        }
    }
    return uniqueCustomers;
}

async function saveCustomers(customers) {
    const savedCustomers = [];
    for (const customer of customers) {
        try {
            const savedCustomer = await saveCustomer(customer);
            savedCustomers.push({ ...customer, id: savedCustomer.id , secure_key: savedCustomer.secure_key });
        } catch (error) {
            console.error(`Error saving customer with email ${customer.email}:`, error);
            throw error;
        }
    }
    return savedCustomers;
}

export {
    getCustomers
};
