import {saveCart} from "../cart/CartApi"

const currencyId = 1;
const langId = 1; 

async function getCarts(file, products , optionValues ,combinations , customers ) {
    const carts = await cartComposition(file , products , optionValues , combinations , customers);
    const cartsWithId = await saveCarts(carts);
    return cartsWithId;
}
async function cartComposition(file , products, optionValues ,combinations , customers) {
    const carts = [];
    try {
        for(const line of file) {

            const name = line["achat"];

            const cartLines = [...name.matchAll(/\((.*?)\)/g)].map(match => match[1]);
            
            const cartLineObjects = cartLines.map(cartLine => {

                let [productRef , quantity , optionValue ] = cartLine.split(";");
                productRef = productRef.replaceAll('"', '').trim();
                quantity = parseInt(quantity);
                optionValue = optionValue.replaceAll('"', '').trim();
                
                
                const productFound = products.find(p => p.reference === productRef);
                const optionValueFound = optionValues.find(ov => ov.name === optionValue);
                let combinationFound = null;
                if (productFound && optionValueFound) {
                    combinationFound = combinations.find(c => productFound.id === c.id_product 
                        && c.id_option_value === optionValueFound.id);
                }
                if(!productFound){
                    return ;
                }
                return {
                    id_product : productFound.id ,
                    quantity : quantity,
                    id_product_attribute : combinationFound ? combinationFound.id : 0,
                    id_address_delivery : 0 ,
                    id_customization : 0
                }
            });
            
            const date = line["date"].split("/");
            const dateFormated = `${date[2]}-${date[1]}-${date[0]} 00:00:00`;

            const cart = [];
            for(const cartLineObject of cartLineObjects){
                if(cartLineObject){
                    cart.push(cartLineObject);
                }
            }


            const customerFound = customers.find(c => c.email === line['email'])
            if(customerFound){

                carts.push({
                    id_customer : customerFound.id,
                    date_add : dateFormated,
                    id_currency : currencyId,
                    id_lang : langId,
                    associations :{
                        cart_rows : {
                            cart_row : cart
                        }
                    }
                });
            }
        }
        return carts;
    } catch (error) {
        throw error;
    }
}
async function saveCarts(carts){
    const savedCarts = [];
    for(const cart of carts) {
        try {
            const savedCart = await saveCart(cart);
            savedCarts.push({ ...cart, id: savedCart.id });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return savedCarts;
}
function compare(c1 , c2){
    if(c1.id_customer!=c2.id_customer) return false;
    const rows1 = c1.associations.cart_rows.cart_row;
    const rows2 = c2.associations.cart_rows.cart_row;
    if(rows1.length != rows2.length) return false;
    for (let index = 0; index < rows1.length; index++) {
        if(
            rows1[index].id_product != rows2[index].id_product ||
            rows1[index].quantity != rows2[index].quantity ||
            rows1[index].id_product_attribute != rows2[index].id_product_attribute 
        ) return false ;
    }
    return true;
}

export {getCarts};