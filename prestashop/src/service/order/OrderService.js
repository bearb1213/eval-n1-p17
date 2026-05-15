import { getAllOrders } from "./OrderApi";
import { getAllCustomers } from "../customer/CustomerApi";
import { getAllCarts } from "../cart/CartApi";
import { getAllOrderStates } from "./OrderStateApi";
import { saveOrderHistory } from "./OrderHistoryApi";
async function getOrders(){
    try {
        const orders = await chargeOrder();
        const customers = await getAllCustomers();
        const carts = await getAllCarts();
        const orderStates = await getAllOrderStates();

        console.log("orders dans getOrders " , orders);
        console.log("customers" , customers);
        console.log("carts" , carts);
        console.log("orderStates" , orderStates);
        return modifyOrder(orders , customers , carts , orderStates);   
    } catch (error) {
        throw error;
    }
}

async function chargeOrder(){
    try {
        const orders = await getAllOrders();
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

async function modifyOrder(orders , customers , carts , orderStates){
    try {
        return orders.map(order => {
            const customerFound = customers.find(customer => customer.id === order.id_customer);
            const cartFound = carts.find(cart => cart.id === order.id_cart);
            const orderStateFound = orderStates.find(orderState => orderState.id === order.current_state);
            return {
                ...order,
                customer : {
                    id : customerFound.id,
                    firstname : customerFound.firstname,
                    lastname : customerFound.lastname,
                    email : customerFound.email
                } ,
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

export {
    getOrders,
    changeStateOrder
};