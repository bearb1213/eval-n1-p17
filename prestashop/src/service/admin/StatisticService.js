import { getProducts } from "../product/ProductService";
import { getOrderLiverPayer } from "../order/OrderService";
import { getAllStockMouvement , getStockMouvementPositif } from "../stock/StockMouvementApi";

async function getProfitByCategory() {
	try {
		const [orders, products,stockMv] = await Promise.all([
			getOrderLiverPayer(),
			getProducts(),
			getStockMouvementPositif()
		]);

		const productById = new Map();
		let totalAchatHt = 0;
		const achatByCategoryId = new Map();
		// console.log("stockMv : ", stockMv);
		normalizeArray(products).forEach(product => {
			if (!product) return;
			const productId = normalizeId(product.id);
			if (productId) {
				productById.set(productId, product);
				let totalProductPurchaseHT = 0;
				normalizeArray(product.stock).forEach(stock => {
					// console.log("stock in  getProfitByCategory : ", stock);
					normalizeArray(stockMv).forEach(stockMv => {
						if (normalizeId(stockMv.id_stock) === normalizeId(stock.id)) {

							const quantity = toNumber(stockMv.physical_quantity);
							const unitCost = toNumber(product.wholesale_price ?? 0);
							const lineTotal = unitCost * quantity;
							if (lineTotal === 0) return;
							totalProductPurchaseHT += lineTotal;
							console.log("quantity : ", quantity, " unitCost : ", unitCost , " lineTotal : ", lineTotal , " totalProductPurchaseHT : ", totalProductPurchaseHT);
						}
					});
				});
				const categoryId = normalizeId(product.category?.id) || "unknown";
				const entry = achatByCategoryId.get(categoryId) || {
					categoryId,
					categoryName: product.category?.name || "Unknown",
					purchaseHT: 0,
				};
				entry.purchaseHT += totalProductPurchaseHT;
				console.log("totalProductPurchaseHT : ", totalProductPurchaseHT);
				console.log("entry purchaseHT : ", entry);
				achatByCategoryId.set(categoryId, entry);
				totalAchatHt += totalProductPurchaseHT;
				console.log("totalAchatHt : ", totalAchatHt);
			}
		});

		const salesByCategoryId = new Map();
		let totalSalesHT = 0;

		normalizeArray(orders).forEach(order => {
			normalizeArray(order?.order_row).forEach(row => {
				const productId = normalizeId(row?.product_id ?? row?.id_product);
				if (!productId) return;
				const product = productById.get(productId);
				if (!product) return;

				const categoryId = normalizeId(product.category?.id) || "unknown";
				const categoryName = product.category?.name || "Unknown";
				const quantity = toNumber(row?.product_quantity ?? row?.quantity ?? 0);
				const unitPrice = toNumber(
					row?.unit_price_tax_excl ?? row?.product_price ?? product.price ?? 0
				);
				const lineTotal = unitPrice * quantity;
				if (lineTotal === 0) return;


				const entry = salesByCategoryId.get(categoryId) || {
					categoryId,
					categoryName,
					salesHT: 0,
					purchaseHT: 0,
				};
				entry.salesHT += lineTotal;
				salesByCategoryId.set(categoryId, entry);
				totalSalesHT += lineTotal;
			});
		});

		const purchasesByCategoryId = new Map();
		let totalPurchaseHT = 0;

		normalizeArray(orders).forEach(order => {
			normalizeArray(order?.order_row).forEach(row => {
				const productId = normalizeId(row?.product_id ?? row?.id_product);
				if (!productId) return;
				const product = productById.get(productId);
				if (!product) return;

				const categoryId = normalizeId(product.category?.id) || "unknown";
				const categoryName = product.category?.name || "Unknown";
				const quantity = toNumber(row?.product_quantity ?? row?.quantity ?? 0);
				const unitCost = toNumber(product.wholesale_price ?? 0);
				const lineTotal = unitCost * quantity;
				if (lineTotal === 0) return;

				const entry = purchasesByCategoryId.get(categoryId) || {
					categoryId,
					categoryName,
					salesHT: 0,
					purchaseHT: 0,
				};
				entry.purchaseHT += lineTotal;
				purchasesByCategoryId.set(categoryId, entry);
				totalPurchaseHT += lineTotal;
			});
		});

		const categoryIds = new Set([
			...salesByCategoryId.keys(),
			...purchasesByCategoryId.keys(),
		]);

		const profitByCategory = Array.from(categoryIds).map(categoryId => {
			const salesEntry = salesByCategoryId.get(categoryId);
			const purchaseEntry = purchasesByCategoryId.get(categoryId);
			const categoryName =
				salesEntry?.categoryName || purchaseEntry?.categoryName || "Unknown";
			const salesHT = salesEntry?.salesHT || 0;
			const purchaseHT = purchaseEntry?.purchaseHT || 0;

			return {
				categoryId,
				categoryName,
				totalSalesHT: salesHT,
				totalPurchaseHT: purchaseHT,
				profitHT: salesHT - purchaseHT,
			};
		});

		profitByCategory.sort((a, b) => b.profitHT - a.profitHT);

		return {
			totalSalesHT,
			totalPurchaseHT,
			totalAchatHt,
			profitByCategory,
			achatByCategoryId
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
}

function normalizeArray(value) {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
}

function normalizeId(value) {
	if (value === null || value === undefined) return "";
	if (typeof value === "object" && "#text" in value) {
		return String(value["#text"]);
	}
	return String(value);
}

function toNumber(value) {
	const num = Number(value);
	return Number.isNaN(num) ? 0 : num;
}

async function getStockByCategory() {
    try {
     
        const [products, stockMovements] = await Promise.all([
            getProducts(),
            getAllStockMouvement(),
        ]);

        const categoryStockMap = new Map();

        normalizeArray(products).forEach(product => {
            console.log("product : ",product);

            const categoryId = normalizeId(product.category?.id) || "unknown";
            const categoryName = product.category?.name || "Unknown";
            let Qtedispo = 0;
            let Qtephysique = 0;

            const stockAvailable = normalizeArray(product.stock);
            const stockSommeEntity = stockAvailable.find(mv =>
                normalizeId(product.id) === normalizeId(mv.id_product)
                && (normalizeId(mv.id_product_attribute) === "0" || mv.id_product_attribute === undefined)
            );
            if (stockSommeEntity) {
                Qtedispo = toNumber(stockSommeEntity.quantity);
            }
            console.log("qte dispo ",Qtedispo);
            let stockCombo = [];
            if (stockAvailable.length > 1) {

                stockCombo = stockAvailable.filter(mv => normalizeId(mv.id_product_attribute) !== "0" || mv.id_product_attribute !== undefined);
            } else if (stockAvailable.length === 1) {
                stockCombo = stockAvailable;
            }
            console.log("stock combo ", stockCombo);
            stockCombo.forEach(mv => {
                const stockMvtFound = normalizeArray(stockMovements).filter(
                    s => normalizeId(s.id_stock) === normalizeId(mv.id)
                );
                if (!stockMvtFound) return;
                stockMvtFound.forEach(stmvf => {
                    const sign = normalizeId(stmvf.sign) === "-1" ? -1 : 1;
                    Qtephysique += toNumber(stmvf.physical_quantity) * sign;
                });     
            });
            const entry = categoryStockMap.get(categoryId) || {
                categoryId,
                categoryName,
                Qtedispo: 0,
                Qtephysique: 0,
                Qtereserver: 0,
            };
            entry.Qtedispo += Qtedispo;
            entry.Qtephysique += Qtephysique;
            entry.Qtereserver += Qtephysique - Qtedispo;
            categoryStockMap.set(categoryId, entry);
        });

        return Array.from(categoryStockMap.values());
       
    } catch (error) {
        console.log(error)   ;
        throw error
    }
}


export {
	getProfitByCategory,
    getStockByCategory ,
};

