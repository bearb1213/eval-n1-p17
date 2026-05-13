import {
    updateStockAvailable,
    getStockAvailableByIdProductAndIdAttribute,
    getAllStockAvailable,

} from "../stock/StockAvailableApi.js";

async function getStock(file, products , option_values , combinations){
    const stock = await getAllStock(file, products , option_values , combinations);
    console.log("Stock to update:", stock);
    await saveStock(stock);
    return stock;
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
    for (const stock of stockAvailable) {
        try {
            await updateStockAvailable(stock.id, stock);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export {
    getStock ,
};