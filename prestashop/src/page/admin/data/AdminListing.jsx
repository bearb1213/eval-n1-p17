import { useEffect, useState } from "react";
import {
    getAdminTaxes,
    getAdminCustomers,
    getAdminAddresses,
    getAdminCategories,
    getAdminOptions,
    getAdminProducts,
} from "../../../service/admin/AdminListingService";

export default function AdminListing() {
    const [taxes, setTaxes] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getStockDisplay = (stock) => {
        if (!stock) return "-";
        const items = Array.isArray(stock) ? stock : [stock];
        const total = items.find(s => s.id_product_attribute === "0" || s.id_product_attribute === 0 || s.id_product_attribute === undefined)?.quantity || 0;
        return String(total);
    };

    useEffect(() => {
        let isMounted = true;

        async function loadAll() {
            try {
                setLoading(true);
                setError(null);
                const [
                    taxesData,
                    customersData,
                    addressesData,
                    categoriesData,
                    optionsData,
                    productsData,
                ] = await Promise.all([
                    getAdminTaxes(),
                    getAdminCustomers(),
                    getAdminAddresses(),
                    getAdminCategories(),
                    getAdminOptions(),
                    getAdminProducts(),
                ]);

                if (!isMounted) return;
                setTaxes(taxesData);
                setCustomers(customersData);
                setAddresses(addressesData);
                setCategories(categoriesData);
                setOptions(optionsData);
                setProducts(productsData);
            } catch (e) {
                if (!isMounted) return;
                setError(e);
            } finally {
                if (!isMounted) return;
                setLoading(false);
            }
        }

        loadAll();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                Loading admin listings...
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load data. Please try again.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Taxes</h2>
                <p className="text-sm text-gray-500">{taxes.length} items</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">Rule Group</th>
                                <th className="px-3 py-2">Tax</th>
                                <th className="px-3 py-2">Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {taxes.map(tax => (
                                <tr key={`${tax.id_tax_rules_group}-${tax.id_tax}`}>
                                    <td className="px-3 py-2">{tax.tax_rules_group_name}</td>
                                    <td className="px-3 py-2">{tax.tax_name}</td>
                                    <td className="px-3 py-2">{tax.rate}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Customers</h2>
                <p className="text-sm text-gray-500">{customers.length} items</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Email</th>
                                <th className="px-3 py-2">Anonymous</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    <td className="px-3 py-2">{customer.id}</td>
                                    <td className="px-3 py-2">
                                        {customer.firstName} {customer.lastname}
                                    </td>
                                    <td className="px-3 py-2">{customer.email}</td>
                                    <td className="px-3 py-2">
                                        {customer.isAnnonymous ? "Yes" : "No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Addresses</h2>
                <p className="text-sm text-gray-500">{addresses.length} items</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Customer</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Address</th>
                                <th className="px-3 py-2">City</th>
                                <th className="px-3 py-2">Postcode</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {addresses.map(address => (
                                <tr key={address.id}>
                                    <td className="px-3 py-2">{address.id}</td>
                                    <td className="px-3 py-2">{address.id_customer}</td>
                                    <td className="px-3 py-2">
                                        {address.firstname} {address.lastname}
                                    </td>
                                    <td className="px-3 py-2">{address.address1}</td>
                                    <td className="px-3 py-2">{address.city}</td>
                                    <td className="px-3 py-2">{address.postcode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
                <p className="text-sm text-gray-500">{categories.length} items</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Parent</th>
                                <th className="px-3 py-2">Active</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {categories.map(category => (
                                <tr key={category.id}>
                                    <td className="px-3 py-2">{category.id}</td>
                                    <td className="px-3 py-2">{category.name}</td>
                                    <td className="px-3 py-2">{category.id_parent}</td>
                                    <td className="px-3 py-2">{category.active}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Options</h2>
                <p className="text-sm text-gray-500">{options.length} items</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Public Name</th>
                                <th className="px-3 py-2">Option Values</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {options.map(option => {
                                const values = option.option_values
                                    ? option.option_values
                                        .map(value => value && value.name)
                                        .filter(Boolean)
                                    : [];

                                return (
                                    <tr key={option.id}>
                                        <td className="px-3 py-2">{option.id}</td>
                                        <td className="px-3 py-2">{option.name}</td>
                                        <td className="px-3 py-2">{option.public_name}</td>
                                        <td className="px-3 py-2">
                                            {values.length ? values.join(", ") : "-"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Products</h2>
                <p className="text-sm text-gray-500">{products.length} items</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Category</th>
                                <th className="px-3 py-2">Tax</th>
                                <th className="px-3 py-2">Price</th>
                                <th className="px-3 py-2">Price TTC</th>    
                                <th className="px-3 py-2">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="px-3 py-2">{product.id}</td>
                                    <td className="px-3 py-2">{product.name}</td>
                                    <td className="px-3 py-2">{product.category?.name || "-"}</td>
                                    <td className="px-3 py-2">{product.tax?.tax_name || "-"}</td>
                                    <td className="px-3 py-2">{product.price}</td>
                                    <td className="px-3 py-2">{(product.price * (1 + (product.tax?.rate || 0) / 100)).toFixed(2)}</td>
                                    <td className="px-3 py-2">{getStockDisplay(product.stock)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
