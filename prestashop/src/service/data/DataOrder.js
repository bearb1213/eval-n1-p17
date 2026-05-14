import {getAllOrderStates} from "../order/OrderStateApi.js";
import { saveOrder,patchOrder } from "../order/OrderApi.js";
import { saveOrderHistory } from "../order/OrderHistoryApi.js";

const carrierId = 1;
const currencyId = 1;
const langId = 1; 
const module = "ps_cashondelivery";

async function getOrders(file , products , carts , customers , addresses , combinations) {
    const orderStates = await getOrderStates();
    console.log("orderStates" , orderStates);
    const orders = await createOrder(file , products , carts , customers , addresses , combinations , orderStates);
    console.log("orders" , orders);
    const savedOrders = await saveOrders(orders);
    console.log("savedOrders" , savedOrders);
    return savedOrders;
}

async function createOrder(file , products , carts , customers , addresses , combinations , orderStates) {
    const retour = [];
    for(const item of file) {
        // console.log("item" , item);

        if(!item["etat"]) continue ;
        const customerFound = customers.find(c => c.email === item["email"]);
        // console.log("customerFound" , customerFound);
        if(!customerFound) continue ;

        const cartFound = carts.find(c => c.name === item["achat"] && c.id_customer === customerFound.id);
        console.log("cartFound" , cartFound);
        if(!cartFound) continue ;
    
        const orderStateFound = orderStates.find(os => os.name === item["etat"].toLowerCase());
        console.log("orderStateFound" , orderStateFound);
        if(!orderStateFound) continue ;

        const addressFound = addresses.find(a => a.address1 === item["adresse"]);
        console.log("addressFound" , addressFound);
        if(!addressFound) continue ;

        const {order_row , prix_ht , prix_ttc} = await createOrderRow(cartFound , products , combinations);
        console.log("orderRow" , order_row);
        console.log("prix_ht" , prix_ht);
        console.log("prix_ttc" , prix_ttc);
        
        const order = {
            
            id_address_delivery : addressFound.id,
            id_address_invoice : addressFound.id,
            id_cart : cartFound.id,
            id_currency : currencyId,
            id_lang : langId,
            id_customer : customerFound.id,
            id_carrier : carrierId,
            current_state : orderStateFound.id,
            module : module,
            payment : "Manual",
            total_products : parseFloat(prix_ht).toFixed(5),
            total_products_wt : parseFloat(prix_ttc).toFixed(5),
            total_shipping : 0,
            total_shipping_tax_incl : 0,
            total_shipping_tax_excl : 0,
            total_paid : parseFloat(prix_ttc).toFixed(5),
            total_paid_tax_incl : parseFloat(prix_ttc).toFixed(5),
            total_paid_tax_excl : parseFloat(prix_ht).toFixed(5),
            total_discounts_tax_excl: 0,
            total_discounts_tax_incl: 0,
            total_wrapping_tax_excl: 0,
            total_wrapping_tax_incl: 0,
            total_paid_real: orderStateFound.id===2 || orderStateFound.id==="2" ? parseFloat(prix_ttc).toFixed(5) : 0,
            conversion_rate: 1,
            secure_key : customerFound.secure_key,
            date_add : cartFound.date_add,
            invoice_date : cartFound.date_add,
            associations : {
                order_rows : {
                    order_row : order_row
                }
            }
        }
        retour.push(order);
    }
    return retour;
}

async function getOrderStates(){
    try {
        const orderStates = await getAllOrderStates();
        const orderStateMap = orderStates.map(os => {
            const name = os.name.language["#text"];
            return {
                id: os.id,
                name: name.toLowerCase()
            }
        });
        return orderStateMap;   
    } catch (error) {
        throw error;
    }
}
async function createOrderRow(cart , products , combinations){
    const orderRow = [];
    let prixTotalHT = 0;
    let prixTotalTTC = 0;
    console.log("Creating order row for cart:", cart);
    for(const item of cart.associations.cart_rows.cart_row){
        const productFound = products.find(p => p.id === item.id_product);
        let price = 0;
        if(item.id_product_attribute!== "0" || item.id_product_attribute !== 0){
            const combinationFound = combinations.find(c => c.id === item.id_product_attribute);
            price = combinationFound ? combinationFound.price : productFound.price;
        } else {
            price = productFound.price;
        }
        prixTotalHT += parseFloat(price * item.quantity).toFixed(5);
        prixTotalTTC += parseFloat(price * item.quantity * (1 + (productFound.tax.rate / 100))).toFixed(5);
        orderRow.push({
            product_id : item.id_product,
            product_quantity : item.quantity,
            product_name : productFound ? productFound.name : "Unknown Product",
            product_attribute_id : item.id_product_attribute,
            product_price : parseFloat(price * item.quantity).toFixed(5),
            unit_price_tax_excl : parseFloat(price).toFixed(5),
            unit_price_tax_incl : parseFloat(price * (1 + (productFound.tax.rate / 100))).toFixed(5),
            product_reference : productFound.reference,
            id_customization: 0
        });
    }
    return {
        order_row: orderRow,
        prix_ht: prixTotalHT,
        prix_ttc: prixTotalTTC
    };
}
async function saveOrders(orders) {
    const savedOrders = [];
    for(const order of orders) {
        try {
            const savedOrder = await saveOrder(order);
            savedOrders.push({...order , id : savedOrder.id});
            await saveOrderHistory({
                id_order : savedOrder.id,
                id_order_state : order.current_state, 
            });
            await patchOrder({
                id: savedOrder.id,
                date_add: order.date_add,
                date_upd : order.date_add,
                invoice_date: order.invoice_date,

            });
        } catch (e) {
            console.log(e);
        }
    }
    return savedOrders;
}



export {
    getOrders,
};