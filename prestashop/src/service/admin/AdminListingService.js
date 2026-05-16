import { getTax } from "../tax/TaxService";
import { getAllCustomersService } from "../customer/CustomerService";
import { getAllAddresses } from "../customer/AddressApi";
import { getAllCategories } from "../category/CategoryApi";
import { chargeOption, getProducts } from "../product/ProductService";

async function getAdminTaxes() {
    return await getTax();
}

async function getAdminCustomers() {
    return await getAllCustomersService();
}

async function getAdminAddresses() {
    const addressesData = await getAllAddresses();
    const rawAddresses = addressesData && addressesData.address ? addressesData.address : [];
    const addresses = Array.isArray(rawAddresses)
        ? rawAddresses
        : rawAddresses
        ? [rawAddresses]
        : [];

    return addresses.map(address => {
        const idCustomer = address.id_customer && address.id_customer["#text"]
            ? address.id_customer["#text"]
            : address.id_customer;

        return {
            id: address.id,
            firstname: address.firstname,
            lastname: address.lastname,
            address1: address.address1,
            city: address.city,
            postcode: address.postcode,
            id_customer: idCustomer,
        };
    });
}

async function getAdminCategories() {
    const categories = await getAllCategories();
    return categories.map(category => {
        const name = category.name && category.name.language
            ? category.name.language["#text"]
            : "";
        const idParent = category.id_parent && category.id_parent["#text"]
            ? category.id_parent["#text"]
            : category.id_parent;

        return {
            id: category.id,
            name,
            id_parent: idParent,
            active: category.active,
        };
    });
}

async function getAdminOptions() {
    return await chargeOption();
}

async function getAdminProducts() {
    return await getProducts();
}

export {
    getAdminTaxes,
    getAdminCustomers,
    getAdminAddresses,
    getAdminCategories,
    getAdminOptions,
    getAdminProducts,
};
