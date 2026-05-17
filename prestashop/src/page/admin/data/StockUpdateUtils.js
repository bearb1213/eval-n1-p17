export function buildKey(productId, attributeId) {
    return `${productId}-${attributeId}`;
}

export function buildRows(products) {
    const rows = [];

    products.forEach(product => {
        const stockItems = Array.isArray(product.stock)
            ? product.stock
            : product.stock
            ? [product.stock]
            : [];

        if (product.combinations && product.combinations.length > 0) {
            product.combinations.forEach(combination => {
                const stockItem = stockItems.find(item =>
                    String(item.id_product_attribute) === String(combination.id)
                );
                rows.push({
                    productId: product.id,
                    productName: product.name,
                    attributeId: combination.id,
                    combinationLabel: getComboLabel(combination),
                    stockQty: stockItem ? stockItem.quantity : 0,
                    stockId: stockItem ? stockItem.id : null,
                });
            });
        } else {
            const stockItem = stockItems.find(item =>
                String(item.id_product_attribute) === "0" || String(item.id_product_attribute) === "undefined" || item.id_product_attribute === undefined
            );
            rows.push({
                productId: product.id,
                productName: product.name,
                attributeId: 0,
                combinationLabel: "",
                stockQty: stockItem ? stockItem.quantity : 0,
                stockId: stockItem ? stockItem.id : null,
            });
        }
    });

    return rows;
}

export function groupMovementsByDay(movements) {
    const groups = new Map();

    movements.forEach(movement => {
        const day = getDayKey(movement.date_add);
        if (!groups.has(day)) {
            groups.set(day, { items: [], total: 0 });
        }
        const group = groups.get(day);
        group.items.push(movement);
        group.total += getMovementSignedQuantity(movement);
    });

    return Array.from(groups.entries()).map(([day, group]) => ({
        day,
        items: group.items,
        total: group.total,
    }));
}

export function getDayKey(dateValue) {
    if (!dateValue) return "Date inconnue";
    if (typeof dateValue === "string") {
        return dateValue.slice(0, 10);
    }
    try {
        return new Date(dateValue).toISOString().slice(0, 10);
    } catch (e) {
        return "Date inconnue";
    }
}

export function formatMovement(movement) {
    const quantity = movement.quantity ?? movement.physical_quantity ?? movement.usable_quantity ?? 0;
    const sign = movement.sign === "1" || movement.sign === 1 ? "Entre" : "Sortie";
    const time = typeof movement.date_add === "string" ? movement.date_add.slice(11, 19) : "";
    const timeLabel = time ? ` ${time}` : "";
    return `quantite: ${quantity}, mouvement : ${sign} A ${timeLabel}`;
}

export function getMovementSignedQuantity(movement) {
    const quantity = movement.quantity ?? movement.physical_quantity ?? movement.usable_quantity ?? 0;
    const sign = movement.sign === "-1" || movement.sign === -1 ? -1 : 1;
    return Number(quantity) * sign;
}

function getComboLabel(combination) {
    if (!combination) return "";
    const names = (combination.option_values || [])
        .map(option => option?.name)
        .filter(Boolean);
    return names.length ? names.join(" / ") : `#${combination.id}`;
}
