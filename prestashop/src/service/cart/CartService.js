import { saveCart , updateCart , getCartById } from "./CartApi";
import { saveOrder } from "../order/OrderApi";
import { saveOrderHistory } from "../order/OrderHistoryApi";
import { getAllIdAddresses } from "../customer/AddressApi";
import { getProducts } from "../product/ProductService";
const currencyId = 1;
const langId = 1; 
const carrierId = 1;
const idShop = 1;
const idState = 2 ;
const module = "ps_cashondelivery";


async function handleCart(idCustomer ,idGuest, idCart ,cart){
    try {
        const associatedCart = cart.map(item => {
            return {
                id_product : item.productId ,
                quantity : item.qty,
                id_product_attribute : item.comboId ? item.comboId : 0,
                id_address_delivery : 0 ,
                id_customization : 0
            }
        });
        
        if (idCart) {
            let modified = {};
            if (!idCustomer && !idGuest) {
                throw new Error("Un client ou un invité doit être associé au panier.");
            } else {
                modified = ( {
                    id : idCart,
                    id_customer : idCustomer ? idCustomer : 0 ,
                    id_currency: currencyId,
                    id_lang: langId,
                    id_shop : 1,
                    id_shop_group : 1,
                    id_guest : idGuest ? idGuest : 0 ,
                    associations : {
                        cart_rows : {
                            cart_row : associatedCart
                        }
                    }
                });
            }
            const result = await updateCart(idCart, modified);
            console.log("Cart mis à jour : ", result);
            return result;
        } else {
            let modified = {};
            if (!idCustomer && !idGuest) {
                throw new Error("Un client ou un invité doit être associé au panier.");
            } else {
                modified = ( {
                    id_customer : idCustomer ? idCustomer : 0 ,
                    id_guest : idGuest ? idGuest : 0 ,
                    id_currency: currencyId,
                    id_lang: langId,
                    id_shop : 1,
                    id_shop_group : 1,
                    associations : {
                        cart_rows : {
                            cart_row : associatedCart
                        }
                    }
                });
            }
            const result = await saveCart(modified);
            localStorage.setItem("cartId", result.id);
            console.log("Cart sauvegardé : ", result);
            return result;
        }
    } catch (e) {
        throw e;
    }

}

async function createOrder(customer ,idGuest, idCart ,cart , products ){
    try {
        
        await handleCart(customer.id ,idGuest, idCart ,cart);

        let prixTTC = 0;
        let prixHT = 0;
        const idAddress = await getIdAddress();
        console.log("ID Address sélectionnée : ", idAddress);
        const now = formatDateSQL();
        const orderRowData = cart.map(item => {
            let price = item.price_ht + item.price_add;
            
            console.log("Calcul du prix pour l'item : ", item);
            console.log("price ", price);
            prixHT+= parseFloat(price * item.qty);
            prixTTC+= parseFloat(item.price * item.qty );
            return {
                product_id : item.productId,
                product_quantity : item.qty,
                product_name : item.productname, 
                product_attribute_id : item.comboId,
                product_price : parseFloat((price * item.qty)).toFixed(6),
                unit_price_tax_excl : parseFloat((price)).toFixed(6),
                unit_price_tax_incl : parseFloat((item.price).toFixed(6)).toFixed(6),
                product_reference : item.reference,
                id_customization: 0
            }

        })
        const order = {
            id_address_delivery : idAddress, 
            id_address_invoice : idAddress,
            id_cart : idCart,
            id_currency : 1,
            id_lang : 1,
            id_customer : customer?.id || 0,
            id_shop : 1,
            id_shop_group : 1,
            // id_guest : idGuest ? idGuest : 0 ,
            id_carrier : carrierId,
            current_state : idState,
            module : module,
            payment : "Manual",
            total_products : parseFloat(prixHT).toFixed(6),
            total_products_wt : parseFloat(prixTTC).toFixed(6),
            total_shipping : 0,
            total_shipping_tax_incl : 0,
            total_shipping_tax_excl : 0,
            total_paid : parseFloat(prixTTC).toFixed(6),
            total_paid_tax_incl : parseFloat(prixTTC).toFixed(6),
            total_paid_tax_excl : parseFloat(prixHT).toFixed(6),
            total_discounts_tax_excl: 0,
            total_discounts_tax_incl: 0,
            total_wrapping_tax_excl: 0,
            total_wrapping_tax_incl: 0,
            total_paid_real: parseFloat(prixTTC).toFixed(6),
            conversion_rate: 1,
            secure_key : customer?.secure_key || "",
            date_add : now,
            invoice_date : now,
            associations : {
                order_rows : {
                    order_row : orderRowData
                }
            }
        }
        const result = await saveOrder(order);
        // const orderHistory = {
        //     id_order : result.id,
        //     id_order_state : 2,
        // };
        // await saveOrderHistory(orderHistory);

        return result;
    } catch (e) {
        console.log(e)
        throw e;
    }
}
async function getIdAddress(){
    try {
        const addresses = await getAllIdAddresses();
        const ids = addresses && Array.isArray(addresses.address)
            ? addresses.address.map(a => a.id)
            : addresses && addresses.address && Object.keys(addresses.address).length > 0
            ? [addresses.address.id]
            : [];
        const idFiltered = ids.filter(id => id !== 1 || id !== "1");
        console.log("IDs d'adresses filtrées : ", idFiltered);
        return idFiltered[Math.floor(Math.random() * idFiltered.length)];
    } catch (error) {
        console.log(error);
        throw error;
    }
}
function formatDateSQL(date = new Date()) {
  return (
    date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0") + " " +
    String(date.getHours()).padStart(2, "0") + ":" +
    String(date.getMinutes()).padStart(2, "0") + ":" +
    String(date.getSeconds()).padStart(2, "0")
  );
}




async function createOrderWithButton (idCart) {
    try {
        const cart = await getCartById(idCart);
        console.log("Cart récupéré pour la création de commande : ", cart);
        const products = await getProducts();
        console.log("Produits récupérés pour la création de commande : ", products);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { 
    handleCart ,
    createOrder ,
    createOrderWithButton,
};