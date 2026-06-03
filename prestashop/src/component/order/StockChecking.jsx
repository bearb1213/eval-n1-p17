import { useEffect } from "react";

export default function StockChecking({ orders, products ,setCanCommande }) {
    if (!orders) {
        return <div className="text-sm text-gray-500">En attente des commandes.</div>;
    }
    
    if (!Array.isArray(products) || products.length === 0) {
        return <div className="text-sm text-gray-500">En attente des produits.</div>;
    }
    
    const orderRows = Array.isArray(orders.order_row) ? orders.order_row : [];
    if (orderRows.length === 0) {
        return <div className="text-sm text-gray-500">Aucun produit a verifier.</div>;
    }
    useEffect(()=> {
        if(orders && products){

            let nb = 0
            orderRows.forEach((order) => {
                const id = order.product_id["#text"];
                const productFound = products.find(
                    (p) => String(p.id) === String(id)
                );
                if (!productFound) {
                    return;
                }
                const stockFound = productFound.stock?.find(
                    (st) =>
                        String(order.product_attribute_id["#text"] ? order.product_attribute_id["#text"] : order.product_attribute_id) ===
                    String(st.id_product_attribute)
                );
                if (Number(stockFound.quantity) < Number(order.product_quantity)) {
                } else {
                    nb++;
                }
                setCanCommande(nb===orderRows.length);
                
            });
        }
    },[orderRows,products])    

    return (
        <div className="space-y-3">
            {orderRows.map((order) => {
                const rawProductId =
                    typeof order.product_id === "object"
                        ? order.product_id["#text"]
                        : order.product_id;
                // console.log("order , ",order);
                const productFound = products.find(
                    (p) => String(p.id) === String(rawProductId)
                );
                const key =
                    order.id ?? `${rawProductId}-${order.product_attribute_id}`;

                if (!productFound) {
                    return (
                        <div
                            key={key}
                            className="rounded-lg border border-amber-200 bg-amber-50 p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <p className="text-sm font-semibold text-gray-900">
                                    {order.product_name}
                                </p>
                                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                                    Produit introuvable
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-gray-600">
                                Verifiez que le catalogue local est a jour.
                            </p>
                        </div>
                    );
                }

                const stockFound = productFound.stock?.find(
                    (st) =>
                        String(order.product_attribute_id) ===
                        String(st.id_product_attribute)
                );
                const availableQty = Number(stockFound?.quantity ?? 0);
                const requiredQty = Number(order.product_quantity ?? 0);
                const isEnough = availableQty >= requiredQty;

                return (
                    <div
                        key={key}
                        className={`rounded-lg border p-4 ${
                            isEnough
                                ? "border-emerald-200 bg-emerald-50"
                                : "border-red-200 bg-red-50"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {order.product_name}
                                </p>
                                {order.product_reference && (
                                    <p className="text-xs text-gray-600">
                                        Ref: {order.product_reference}
                                    </p>
                                )}
                            </div>
                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                    isEnough
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {isEnough ? "Stock OK" : "Stock insuffisant"}
                            </span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-700">
                            <div>
                                Demande: <span className="font-semibold">{requiredQty}</span>
                            </div>
                            <div>
                                Dispo: <span className="font-semibold">{availableQty}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}