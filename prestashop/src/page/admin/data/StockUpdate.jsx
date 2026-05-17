import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../../service/product/ProductService";
import {
    getStockAvailableByIdProductAndIdAttribute,
    updateStockAvailable,
} from "../../../service/stock/StockAvailableApi";
import {
    saveStockMouvement,
    getStockMouvementByIdStock,
} from "../../../service/stock/StockMouvementApi";
import StockUpdateTable from "./components/StockUpdateTable";
import { buildKey, buildRows } from "./StockUpdateUtils";

export default function StockUpdate() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pendingAdds, setPendingAdds] = useState({});
    const [savingKey, setSavingKey] = useState(null);
    const [movementByKey, setMovementByKey] = useState({});

    useEffect(() => {
        let isMounted = true;
        async function loadProducts() {
            try {
                setLoading(true);
                setError(null);
                const data = await getProducts();
                if (!isMounted) return;
                setProducts(data || []);
            } catch (e) {
                if (!isMounted) return;
                setError(e);
            } finally {
                if (!isMounted) return;
                setLoading(false);
            }
        }

        loadProducts();
        return () => {
            isMounted = false;
        };
    }, []);
    // useEffect(() => {

    const handleChange = (key, value) => {
        setPendingAdds(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAddStock = async (productId, attributeId) => {
        const key = buildKey(productId, attributeId);
        const rawValue = pendingAdds[key];
        const toAdd = Number(rawValue);

        if (!rawValue || Number.isNaN(toAdd) ) {
            alert("Veuillez saisir une quantite valide a ajouter.");
            return;
        }

        setSavingKey(key);
        try {
            const stockAvailable = await getStockAvailableByIdProductAndIdAttribute(
                productId,
                attributeId
            );
            const stockItem = Array.isArray(stockAvailable)
                ? stockAvailable[0]
                : stockAvailable;

            if (!stockItem) {
                throw new Error("Stock introuvable pour ce produit.");
            }

            const currentQty = Number(stockItem.quantity) || 0;
            let sign = 1;
            if (toAdd <= 0) {
                sign = -1;
                if(currentQty + toAdd < 0) {
                    alert("La quantite a retirer est superieure au stock actuel.");
                    return;
                }
            }
            const updatedStock = {
                ...stockItem,
                quantity: currentQty + toAdd,
                out_of_stock: 1,
            };

            const updated = await updateStockAvailable(stockItem.id, updatedStock);
            await saveStockMouvement({
                id_product: productId,
                id_product_attribute: attributeId,
                id_employee: 1,
                id_warehouse: 1,
                id_stock: updated.id,
                price_te: 1,
                id_stock_mvt_reason : 12 , 
                sign : sign,
                physical_quantity : toAdd * sign,
                price_te : 1,   
                // usable_quantity: sign
                date_add : new Date().toISOString().slice(0, 19).replace("T", " "),
            });
            setProducts(prev =>
                prev.map(product => {
                    if (String(product.id) !== String(productId)) {
                        return product;
                    }
                    const stockItems = Array.isArray(product.stock)
                        ? product.stock
                        : product.stock
                        ? [product.stock]
                        : [];

                    const updatedStockItems = stockItems.map(item => {
                        if (String(item.id) !== String(updated.id)) {
                            return item;
                        }
                        return {
                            ...item,
                            quantity: updated.quantity,
                        };
                    });

                    return {
                        ...product,
                        stock: updatedStockItems,
                    };
                })
            );
            setPendingAdds(prev => ({
                ...prev,
                [key]: "",
            }));
        } catch (e) {
            console.log(e);
            alert("Erreur lors de la mise a jour du stock.");
        } finally {
            setSavingKey(null);
        }
    };

    const toggleMovements = async (row) => {
        const key = buildKey(row.productId, row.attributeId);
        const current = movementByKey[key];

        if (current?.open) {
            setMovementByKey(prev => ({
                ...prev,
                [key]: { ...current, open: false },
            }));
            return;
        }

        if (!row.stockId) {
            return;
        }

        if (current?.data) {
            setMovementByKey(prev => ({
                ...prev,
                [key]: { ...current, open: true, error: null },
            }));
            return;
        }

        setMovementByKey(prev => ({
            ...prev,
            [key]: { open: true, loading: true, data: null, error: null },
        }));

        try {
            const movements = await getStockMouvementByIdStock(row.stockId);
            const normalized = Array.isArray(movements)
                ? movements
                : movements
                ? [movements]
                : [];
            setMovementByKey(prev => ({
                ...prev,
                [key]: { open: true, loading: false, data: normalized, error: null },
            }));
        } catch (e) {
            setMovementByKey(prev => ({
                ...prev,
                [key]: { open: true, loading: false, data: [], error: e },
            }));
        }
    };

    const rows = useMemo(() => buildRows(products), [products]);

    if (loading) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                Chargement des Stock...
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Impossible de charger les Stock.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold text-gray-800">Ajouter du stock</h1>
                <p className="text-sm text-gray-500">
                    Mettez a jour le stock des produits et des combinaisons.
                </p>
            </section>

            <StockUpdateTable
                rows={rows}
                pendingAdds={pendingAdds}
                savingKey={savingKey}
                movementByKey={movementByKey}
                onChange={handleChange}
                onAddStock={handleAddStock}
                onToggleMovements={toggleMovements}
            />
        </div>
    );
}
