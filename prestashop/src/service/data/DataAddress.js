import { saveAddress } from "../customer/AddressApi";

const countryId = 8 ; 

async function getAddresses(file) {
    const createdAddresses = await createAddresses(file);
    const addressesWithId = await saveAddresses(createdAddresses);
    return addressesWithId;
}

async function createAddresses(file) {
    const addresses = file.map(item => item["adresse"]);
    const uniqueAddresses = [... new Set(addresses)];
    return uniqueAddresses.map((address) => {
        return {
            id_country : countryId,
            alias : address,
            firstname : address,
            lastname : address,
            address1 : address,
            city : address,
        };
    });
}

async function saveAddresses(addresses) {
    const savedAddresses = [];
    for (const address of addresses) {
        try {
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