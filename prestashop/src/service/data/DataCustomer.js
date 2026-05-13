import {saveCustomer } from "../customer/CustomerApi";

async function getCustomers(file) {
    const customers = await createCustomers(file);
    const customersWithId = await saveCustomers(customers);
    return customersWithId;
}
async function createCustomers(file) {
    const customers = file.map(
        item => {
            return {
                lastname: item["nom"],
                firstname: item["nom"],
                email: item["email"],
                passwd: item["pwd"]
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
            savedCustomers.push({ ...customer, id: savedCustomer.id });
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
