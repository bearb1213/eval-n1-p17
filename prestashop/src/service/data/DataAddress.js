import { saveAddress } from "../customer/AddressApi";

const countryId = 8 ; 

const colDate = "date";
const colNom = "nom";
const colEmail = "email";
const colPwd = "pwd";
const colAdresse = "adresse";
const colAchat = "achat";
const colEtat = "etat";
async function getAddresses(file) {
    const createdAddresses = await createAddresses(file);
    const addressesWithId = await saveAddresses(createdAddresses);
    return addressesWithId;
}

async function createAddresses(file) {
    const addresses = file.map(item => item[colAdresse]);
    const uniqueAddresses = [... new Set(addresses)];
    return uniqueAddresses.map((address) => {
        return {
            id_country : countryId,
            alias : address.replaceAll(/[^a-zA-Z ]/g, ""),
            firstname : address.replaceAll(/[^a-zA-Z ]/g, ""),
            lastname : address.replaceAll(/[^a-zA-Z ]/g, ""),
            address1 : address,
            city : address.replaceAll(/[^a-zA-Z ]/g, ""),
        };
    });
}

async function saveAddresses(addresses) {
    const savedAddresses = [];
    for (const address of addresses) {
        try {
            console.log("address ",address);
            const savedAddress = await saveAddress(address);
            savedAddresses.push({ ...address, id: savedAddress.id });
        } catch (error) {
            console.error("Error saving address:", error);
            throw error;
        }
    }
    return savedAddresses;
}
export { getAddresses };