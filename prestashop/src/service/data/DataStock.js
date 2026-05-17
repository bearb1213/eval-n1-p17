import {
    updateStockAvailable,
    getStockAvailableByIdProductAndIdAttribute,
    getAllStockAvailable,

} from "../stock/StockAvailableApi.js";
import { saveStockMouvement , patchStockMouvement } from "../stock/StockMouvementApi.js";


async function getStock(file, products , option_values , combinations){
    const stock = await getAllStock(file, products , option_values , combinations);
    const stockWithId = await saveStock(stock);
    return stockWithId;
}
async function getStockWare(stockAvailable) {
    try {
        const retour = [];
        for (const stock of stockAvailable) {
            const id_product = stock.id_product["#text"] ;
            const id_product_attribute = stock.id_product_attribute !== 0 || stock.id_product_attribute !== "0"
                                            ? stock.id_product_attribute["#text"] || stock.id_product_attribute : 0;
            const stockToSend = {
                id_warehouse : 1,
                price_te : 1,
                physical_quantity : stock.quantity,
                id_product : id_product,
                id_product_attribute : id_product_attribute,
                usable_quantity : stock.quantity,
            }
            const result = await saveStock(stockToSend);
            stockToSend.id = result.id;
            retour.push(stockToSend);
        
        }
        return retour;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllStock(file, products , option_values , combinations){
    try {
    
    const stockAvailableMap = await getAllStockAvailable();
    const stockAvailable = file.map(item=> {
        const productFound = products.find(p => p.reference === item["reference"]);
        const id_product = productFound ? productFound.id : null;
        if (!id_product) {
            console.log(`Product not found for reference: ${item["reference"]}`);
            return null;
        }
        const optionValueFound = option_values.find(ov => ov.name === item["karazany"] );
        let id_attribute = 0;
        if (optionValueFound) {   
            const combinationFound = combinations.find(c => 
                    c.id_product === id_product
                    && c.id_option_value === optionValueFound.id
            );
            id_attribute = combinationFound ? combinationFound.id : 0;
        }
        const quantity = parseInt(item['stock_initial']);

        // console.log(" id_product: ", id_product, "id_attribute: ", id_attribute, "quantity: ", quantity);
        // const stock = await getStockAvailableByIdProductAndIdAttribute(id_product, id_attribute);
        const stock = stockAvailableMap.find(s => (
                                                    s.id_product["#text"] === id_product.toString() 
                                                    || s.id_product["#text"] === id_product
                                                    || s.id_product === id_product.toString() 
                                                    || s.id_product === id_product
                                                )
                                                && (
                                                    s.id_product_attribute === id_attribute.toString() 
                                                    || s.id_product_attribute === id_attribute
                                                    || s.id_product_attribute["#text"] === id_attribute.toString()
                                                    || s.id_product_attribute["#text"] === id_attribute 
                                                )
                                            );
        if (stock) {
            stock.quantity = quantity;
            stock.out_of_stock = 1;
            // await updateStockAvailable(stock.id, stock);
        } 
        return stock;
    });
    const retour = [];
    for (const stock of stockAvailable) {
        if (stock) {
            retour.push(stock);
        }
    }
    return retour;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

async function saveStock(stockAvailable) {
    const savedStock = [];
    for (const stock of stockAvailable) {
        try {
            const updatedStock = await updateStockAvailable(stock.id, stock);
            const move = await saveStockMouvement({
                id_product: stock.id_product["#text"],
                id_product_attribute: stock.id_product_attribute !== 0 || stock.id_product_attribute !== "0"
                                        ? stock.id_product_attribute["#text"] : 0  ,
                id_employee: 1,
                id_stock_mvt_reason : 12 , 
                sign : 1,
                id_stock : stock.id,
                price_te: 1,
                physical_quantity : stock.quantity,
                date_add : "2024-06-01 00:00:00",
            });
            await patchStockMouvement({
                id : move.id,
                date_add : "2024-06-01 00:00:00"
            })
            savedStock.push({ ...stock, id: updatedStock.id });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return savedStock;
}

export {
    getStock ,
    getStockWare ,
};