import { getAllOrders , getOrderByCustomerId , getOrderByOrderState } from "./OrderApi";
import { getAllCustomers } from "../customer/CustomerApi";
import { getAllCarts , getAllCartsByCustomerId } from "../cart/CartApi";
import { getAllOrderStates } from "./OrderStateApi";
import { saveOrderHistory } from "./OrderHistoryApi";
import { getProducts } from "../product/ProductService";

import { saveCart } from "../cart/CartApi";
import { saveOrder } from "./OrderApi";

import { normalizeId } from "../util/Utils";

const currencyId = 1;
const langId = 1; 
const carrierId = 1;
const idShop = 1;
const idState = 2 ;
const module = "ps_cashondelivery";


async function getOrders(){
    try {
        const orders = await chargeOrder();
        const customers = await getAllCustomers();
        const carts = await getAllCarts();
        const orderStates = await getAllOrderStates();
        const products = await getProducts();

        // console.log("orders dans getOrders " , orders);
        // console.log("customers" , customers);
        // console.log("carts" , carts);
        // console.log("orderStates" , orderStates);
        const orderData = await modifyOrder(orders , customers , carts , orderStates);   
        // console.log("orderData" , orderData);
        const cartNotInOrders = await getCartNotInOrders(carts , orders);
        console.log("cartNotInOrders" , cartNotInOrders);
        const modifiedCart = await modifyCart(cartNotInOrders , customers , products);
        console.log("modifiedCart" , modifiedCart);
        // // const modifiedCart = []
        const combinedData = [...orderData, ...modifiedCart];
        console.log("combinedData" , combinedData);
        return combinedData;

        // return orderData;   
    } catch (error) {
        throw error;
    }
}
async function getOrdersByCustomerId(customerId){
    try {
        const orders = await chargeOrderByCustomerId(customerId);
        const customers = await getAllCustomers();
        const carts = await getAllCartsByCustomerId(customerId);
        const orderStates = await getAllOrderStates();
        const products = await getProducts();

        // console.log("orders dans getOrders " , orders);
        // console.log("customers" , customers);
        // console.log("carts" , carts);
        // console.log("orderStates" , orderStates);
        const orderData = await modifyOrder(orders , customers , carts , orderStates);   
        // console.log("orderData" , orderData);
        const cartNotInOrders = await getCartNotInOrders(carts , orders);
        console.log("cartNotInOrders" , cartNotInOrders);
        const modifiedCart = await modifyCart(cartNotInOrders , customers , products);
        console.log("modifiedCart" , modifiedCart);
        // // const modifiedCart = []
        const combinedData = [...orderData, ...modifiedCart];
        console.log("combinedData" , combinedData);
        return combinedData;

        // return orderData;    
    } catch (error) {
        throw error;
    }
}
async function getOrderByCustomerIdAndId(customerId, id){
    try {
        const orders = await getOrdersByCustomerId(customerId);
        console.log("customer id ",customerId)
        console.log("orders dans getOrderByCustomerIdAndId " , orders);
        return orders.find(o => String(o.id)===id )
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function getOrderLiverPayer(){
    try {
        const orders = await chargeOrderLiverPayer();
        const customers = await getAllCustomers();
        const carts = await getAllCarts();
        const orderStates = await getAllOrderStates();
        const products = await getProducts();

        // console.log("orders dans getOrders " , orders);
        // console.log("customers" , customers);
        // console.log("carts" , carts);
        // console.log("orderStates" , orderStates);
        const orderData = await modifyOrder(orders , customers , carts , orderStates);   
        
        return orderData;

        // return orderData;    
    } catch (error) {
        throw error;
    }
}

async function chargeOrder(){
    try {
        const orders = await getAllOrders();
        // console.log("orders dans change " , orders);
        return orders.map(order => {
            return {
                id : order.id,
                id_address : order.id_address_delivery["#text"] ? order.id_address_delivery["#text"] : order.id_address_invoice["#text"]? order.id_address_invoice["#text"] : 0,
                id_cart : order.id_cart["#text"],
                id_customer : order.id_customer["#text"],
                current_state : order.current_state["#text"],
                invoice_date : order.invoice_date,
                date_add : order.date_add,
                secure_key : order.secure_key,
                is_order : true,
                total_paid : order.total_paid,
                total_paid_tax_incl : order.total_paid_tax_incl,
                total_paid_tax_excl : order.total_paid_tax_excl,
                total_paid_real : order.total_paid_real,
                reference : order.reference,
                order_row : Array.isArray(order.associations.order_rows.order_row) ? order.associations.order_rows.order_row : [order.associations.order_rows.order_row]
            }
        });
    } catch (error) {
        throw error;
    }
}

async function chargeOrderByCustomerId(customerId){
    try {
        const orders = await getOrderByCustomerId(customerId);
        console.log("orders dans change " , orders);
        return orders.map(order => {
            return {
                id : order.id,
                id_address : order.id_address_delivery["#text"] ? order.id_address_delivery["#text"] : order.id_address_invoice["#text"]? order.id_address_invoice["#text"] : 0,
                id_cart : order.id_cart["#text"],
                id_customer : order.id_customer["#text"],
                current_state : order.current_state["#text"],
                invoice_date : order.invoice_date,
                date_add : order.date_add,
                secure_key : order.secure_key,
                is_order : true,
                total_paid : order.total_paid,
                total_paid_tax_incl : order.total_paid_tax_incl,
                total_paid_tax_excl : order.total_paid_tax_excl,
                total_paid_real : order.total_paid_real,
                total_can_paid : order.total_paid,
                reference : order.reference,
                order_row : Array.isArray(order.associations.order_rows.order_row) ? order.associations.order_rows.order_row : [order.associations.order_rows.order_row]
            }
        });
    } catch (error) {
        throw error;
    }
}
async function chargeOrderLiverPayer(){

    try {
        const orders = await getOrderByOrderState([2,11,5]);
        console.log("orders dans change " , orders);
        return orders.map(order => {
            return {
                id : order.id,
                id_address : order.id_address_delivery["#text"] ? order.id_address_delivery["#text"] : order.id_address_invoice["#text"]? order.id_address_invoice["#text"] : 0,
                id_cart : order.id_cart["#text"],
                id_customer : order.id_customer["#text"],
                current_state : order.current_state["#text"],
                invoice_date : order.invoice_date,
                date_add : order.date_add,
                secure_key : order.secure_key,
                is_order : true,
                total_paid : order.total_paid,
                total_paid_tax_incl : order.total_paid_tax_incl,
                total_paid_tax_excl : order.total_paid_tax_excl,
                total_paid_real : order.total_paid_real,
                total_can_paid : order.total_paid,
                reference : order.reference,
                order_row : Array.isArray(order.associations.order_rows.order_row) ? order.associations.order_rows.order_row : [order.associations.order_rows.order_row]
            }
        });
    } catch (error) {
        throw error;
    }
}

async function modifyOrder(orders , customers , carts , orderStates){
    try {
        return orders.map(order => {
            const customerFound = customers.find(customer => customer.id === order.id_customer);
            const cartFound = carts.find(cart => cart.id === order.id_cart);
            const orderStateFound = orderStates.find(orderState => orderState.id === order.current_state);
            return {
                ...order,
                customer : customerFound ? {
                    id : customerFound.id,
                    firstname : customerFound.firstname,
                    lastname : customerFound.lastname,
                    email : customerFound.email
                } : null ,
                cart : {
                    id : cartFound.id,
                    carts : Array.isArray(cartFound.associations.cart_rows.cart_row) ? cartFound.associations.cart_rows.cart_row : [cartFound.associations.cart_rows.cart_row]
                },
                orderState : {
                    id : orderStateFound.id,
                    name : orderStateFound.name.language["#text"] ? orderStateFound.name.language["#text"] : orderStateFound.name.language[0]["#text"] ? orderStateFound.name.language[0]["#text"] : "Unknown"
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

async function changeStateOrder(id , newState){
    try {
        await saveOrderHistory({
                    id_order : id,
                    id_order_state : newState, 
                });
        
    } catch (error) {
        throw error;
    }
    return newState
}
async function getCartNotInOrders(Carts , Orders){
    try {
        const cartsInOrders = Orders.map(order => order.id_cart);
        return Carts.filter(cart => !cartsInOrders.includes(cart.id));
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function modifyCart(carts , customers , products){
    try {
        // console.log("carts dans modifyCart" , customers);
        return carts.map(cart => {
            // console.log("cart dans modifyCart" , cart);
            let priceHt = 0;
            let priceTtc = 0;
            const customerFound = customers.find(customer => customer.id === (cart.id_customer["#text"] || cart.id_customer));
            // console.log("customerFound dans modifyCart" , customerFound);
            if(!customerFound) return null;
            const cartRow = cart.associations.cart_rows.cart_row 
                            ? (
                                Array.isArray(cart.associations.cart_rows.cart_row) 
                                ? cart.associations.cart_rows.cart_row 
                                : [cart.associations.cart_rows.cart_row]
                            ) 
                            : [];
            // console.log("cartRow" , cartRow);
            const orderRow = cartRow.map(row => {
                const productFound = products.find(product => product.id === row.id_product["#text"] || product.id === row.id_product);
                if(!productFound) return null;
                const combination = productFound.combinations && productFound.combinations.length > 0 
                    ? productFound.combinations.find(comb => String(comb.id) === String(row.id_product_attribute["#text"] || row.id_product_attribute)) : null;
                let priceht = productFound ? parseFloat(combination ? combination.price + productFound.price : productFound.price ) : 0;
                priceHt += priceht * parseInt(row.quantity);
                priceTtc += priceht * parseInt(row.quantity) * (1 + (productFound.tax.rate/100));
                return {
                    product_id : row.id_product,
                    product_attribute_id : row.id_product_attribute,
                    product_quantity : row.quantity,
                    product_name : productFound ? productFound.name : "Unknown",
                    product_reference : productFound ? productFound.reference : "Unknown",
                    unit_price_tax_excl : productFound ? priceht : 0,
                    unit_price_tax_incl : productFound ? priceht * (1 + (productFound.tax.rate/100)) : 0,
                    product_price : productFound ? priceht  : 0,
                }
            }).filter(row => row !== null);
            return {
                id : cart.id,
                id_address : 0,
                id_cart : cart.id,
                id_customer : cart.id_customer["#text"],
                current_state : "0",
                invoice_date : null,
                date_add : cart.date_add,
                is_order : false,
                secure_key : cart.secure_key,
                total_paid : priceTtc,
                total_paid_tax_incl : priceTtc,
                total_paid_tax_excl : priceHt,
                total_paid_real : 0,
                total_can_paid : priceTtc,
                reference : "Panier n°" + cart.id,
                order_row : orderRow,
                customer : {
                    id : customerFound.id,
                    firstname : customerFound.firstname,
                    lastname : customerFound.lastname,
                    email : customerFound.email
                } ,
                cart : {
                    id : cart.id,
                    carts : Array.isArray(cart.associations.cart_rows.cart_row) ? cart.associations.cart_rows.cart_row : [cart.associations.cart_rows.cart_row]
                } ,
                orderState : {
                    id : 0,
                    name : "Dans le panier"
                }
            }
        }).filter(cart => cart !== null);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function createOrderWoutCart(order , idCustomer ){
    try {
        const cartRows = order.cart.carts.map(cartRow => {
            return {
                id_address_delivery: normalizeId(cartRow.id_address_delivery) ,
                id_customization : normalizeId(cartRow.id_customization) ,
                id_product : normalizeId(cartRow.id_product) ,
                id_product_attribute : normalizeId(cartRow.id_product_attribute) ,
                quantity : cartRow.quantity
            }
        });
        const savedCart = await saveCart({
            id_customer : idCustomer || order.id_customer ,
            id_currency: currencyId,
            id_lang: langId,
            id_shop : 1,
            id_shop_group : 1,
            associations : {
                cart_rows : {
                    cart_row : cartRows
                }
            }
        })
        console.log("savedCart" , savedCart);
        const orderRows = order.order_row.map(orderRow => {
            return{
                product_name: orderRow.product_name,
                product_price: orderRow.product_price.toFixed(6),
                product_attribute_id : normalizeId(orderRow.product_attribute_id),
                product_id: normalizeId(orderRow.product_id),
                product_quantity : orderRow.product_quantity ,
                product_reference : orderRow.product_reference,
                unit_price_tax_excl : orderRow.unit_price_tax_excl.toFixed(6),
                unit_price_tax_incl : orderRow.unit_price_tax_incl.toFixed(6),
            }
        });
        const orderToSave =  ({
            id_address_delivery : normalizeId(order.id_address),
            id_address_invoice : normalizeId(order.id_address),
            id_currency: currencyId,
            id_cart : savedCart.id,
            id_customer : idCustomer || (order.id_customer),
            id_lang: langId,
            id_shop : 1,
            id_shop_group : 1,
            id_carrier : carrierId,
            module : module,
            payment : order.payment ?? "Manual" ,
            total_products : order.total_paid_tax_excl.toFixed(6),
            total_products_wt : order.total_paid_tax_incl.toFixed(6),
            total_shipping : 0,
            total_shipping_tax_incl : 0,
            total_shipping_tax_excl : 0,
            total_paid : order.total_paid_tax_incl.toFixed(6),
            total_paid_tax_incl : order.total_paid_tax_incl.toFixed(6),
            total_paid_tax_excl : order.total_paid_tax_excl.toFixed(6),
            total_paid_real: order.total_paid_tax_incl.toFixed(6),
            conversion_rate: 1,
            secure_key : order.secure_key,
            date_add : new Date().toISOString().slice(0, 19).replace('T', ' '),
            invoice_date : new Date().toISOString().slice(0, 19).replace('T', ' '),
            associations : {
                order_rows : {
                    order_row : orderRows
                }
            }
        });
        // console.log("order to save" , orderToSave);
        const savedOrder = await saveOrder(orderToSave);
        // console.log("order to save" , savedOrder);
        // const retour = await saveOrderHistory(savedOrder);
        return savedOrder;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    getOrders,
    changeStateOrder,
    getOrdersByCustomerId,
    getOrderLiverPayer,
    getOrderByCustomerIdAndId,
    createOrderWoutCart,
};