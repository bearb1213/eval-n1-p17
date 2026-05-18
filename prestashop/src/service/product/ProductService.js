import { getAllProducts } from "./ProductApi";
import { getAllProductOptionValues } from "./ProductOptionValueApi";
import { getAllProductOptions } from "./ProductOptionApi";
import { getAllCombinations } from "../combination/CombinationApi";
import { getAllCategories } from "../category/CategoryApi";
import {getAllStockAvailable} from "../stock/StockAvailableApi";
import { getTax } from "../tax/TaxService";

async function getProducts() {
    const taxes = await getTax();
    const categories = await chargeCategory();
    const optionValues = await chargeOptionValue();
    const options = await chargeOption(optionValues);
    const combinations = await chargeCombination(optionValues);
    const stock = await chargeStock();

    const products = await chargeProducts(taxes , categories , optionValues , options , combinations , stock);
    // console.log("taxes", taxes);
    // console.log("products", products);
    return products;
}

async function chargeProducts(taxes , categories , optionValues , options , combinations , stock){
    try {
        const products = await getAllProducts();
        return products.map(product => {
            const category = categories.find(c => String(c.id) === String(product.id_category_default["#text"]));
            const optionValuesId =( product.associations.product_option_values 
                                    && product.associations.product_option_values.product_option_value 
                                    ? ( Array.isArray(product.associations.product_option_values.product_option_value) 
                                    ? product.associations.product_option_values.product_option_value 
                                    : [product.associations.product_option_values.product_option_value] ) 
                                    : []).map(ov => ov.id);
            const optionValuesFormatted = optionValuesId.map(ovId => {
                return optionValues.find(ov => String(ov.id) === String(ovId));
            });
            const combinationsId = (product.associations.combinations 
                                    && product.associations.combinations.combination 
                                    ? ( Array.isArray(product.associations.combinations.combination) 
                                    ? product.associations.combinations.combination 
                                    : [product.associations.combinations.combination] ) 
                                    : []).map(c => c.id);
            const combinationsFormatted = combinationsId.map(cId => {
                return combinations.find(c => String(c.id) === String(cId));
            });
            const stockId = (product.associations.stock_availables 
                            && product.associations.stock_availables.stock_available 
                                ? ( Array.isArray(product.associations.stock_availables.stock_available) 
                                    ? product.associations.stock_availables.stock_available 
                                    : [product.associations.stock_availables.stock_available] ) 
                                    : []).map(sa => sa.id);
            const stockFormatted = stockId.map(saId => {
                return stock.find(sa => String(sa.id) === String(saId));
            });
            
            const tax = taxes.find(t => String(t.id_tax_rules_group) === String(product.id_tax_rules_group["#text"]));
            // const toAdd = combinationsFormatted.length > 0 ;
            return {
                id : product.id,
                category : category ,
                tax : tax,
                id_default_image : product.id_default_image ? product.id_default_image["#text"] : null,
                image_url : buildProductImageUrl(product.id, product.id_default_image ? product.id_default_image["#text"] : null),
                reference : product.reference, 
                name : product.name.language["#text"],
                price : parseFloat(product.price) ,
                wholesale_price : product.wholesale_price,
                option_values : optionValuesFormatted,
                combinations : combinationsFormatted,
                stock : stockFormatted ,
                available_date : product.available_date,
            }
        });
    } catch (error) {
        throw error;
    }
}

function buildProductImageUrl(productId, imageId) {
    if (!productId || !imageId) return null;
    return `http://localhost/prestashop1/api/images/products/${productId}/${imageId}`;
}
async function chargeCategory(){
    try {
        const categories = await getAllCategories();
        return categories.map(category => {
            return {
                id : category.id,
                name : category.name.language["#text"],
            }
        });
    } catch (error) {
        throw error;
    }
}
async function chargeOptionValue(){
    try {
        const optionValues = await getAllProductOptionValues();
        return optionValues.map(optionValue => {
            return {
                id : optionValue.id,
                name : optionValue.name.language["#text"],
                id_attribute_group : optionValue.id_attribute_group["#text"],
            }
        });
    } catch (error) {
        throw error;
    }
}
async function chargeOption(optionValues=null){
    try {
        if(optionValues === null) optionValues = await chargeOptionValue();
        const options = await getAllProductOptions();
        const retour = [];
        for (const option of options) {
            // console.log("option Processing : ", option);
            const name = option.name.language["#text"];
            const id = option.id;
            const public_name = option.public_name.language["#text"];
            const itsOptionValues = option.associations.product_option_values 
                                    && option.associations.product_option_values.product_option_value 
                                    ? ( Array.isArray(option.associations.product_option_values.product_option_value) 
                                        ? option.associations.product_option_values.product_option_value : [option.associations.product_option_values.product_option_value] 
                                    ) : [];
            // console.log("itsOptionValues", itsOptionValues);
            const itsOptionValuesFormated = itsOptionValues.map(ov => {
                const ovFound = optionValues.find(ovf => String(ovf.id) === String(ov.id));
                return ovFound
            });
            // console.log("itsOptionValuesFormated", itsOptionValuesFormated);
            retour.push({
                id,
                name,
                public_name,
                option_values : itsOptionValuesFormated,
            });
        }
        return retour;
    } catch (error) {
        throw error;
    }
}
async function chargeCombination(optionValues=null){
    try {
        if(optionValues === null) optionValues = await chargeOptionValue();
        const combinations = await getAllCombinations();
        const retour = [];
        for (const combination of combinations) {
            const id = combination.id;
            const id_product = combination.id_product["#text"];
            const wholesale_price = combination.wholesale_price;
            const price = combination.price;
            const available_date = combination.available_date;
            const option_values_ids = combination.associations.product_option_values && combination.associations.product_option_values.product_option_value 
                                        ? ( Array.isArray(combination.associations.product_option_values.product_option_value) 
                                            ? combination.associations.product_option_values.product_option_value.map(ov => ov.id)
                                            : [combination.associations.product_option_values.product_option_value.id]
                                        ) : [];
            const option_values = option_values_ids.map(ovId => {
                const ovFound = optionValues.find(ovf => String(ovf.id) === String(ovId));
                return ovFound
            });
            retour.push({
                id,
                id_product,
                wholesale_price,
                price,
                available_date,
                option_values,
            });
        }
        return retour;
    
    } catch (error) {
        throw error;
    }
}
async function chargeStock(){
    try {
        const stockAvailable = await getAllStockAvailable();
        return stockAvailable.map(stock => {
            return {
                id : stock.id,  
                id_product : stock.id_product["#text"],
                id_product_attribute : stock.id_product_attribute !== 0 || stock.id_product_attribute !== "0"
                                        ? stock.id_product_attribute["#text"] : 0  ,
                quantity : stock.quantity,
            }
        });
        return stockAvailable;
    } catch (error) {
        throw error;
    }
}

export { 
    getProducts, 
    chargeOption,
};
