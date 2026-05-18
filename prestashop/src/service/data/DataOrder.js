import {getAllOrderStates} from "../order/OrderStateApi.js";
import { saveOrder,patchOrder } from "../order/OrderApi.js";
import { saveOrderHistory } from "../order/OrderHistoryApi.js";
import { saveStockMouvement ,patchStockMouvement } from "../stock/StockMouvementApi.js";

const carrierId = 1;
const currencyId = 1;
const langId = 1; 
const module = "ps_cashondelivery";


const colDate = "date";
const colNom = "nom";
const colEmail = "email";
const colPwd = "pwd";
const colAdresse = "adresse";
const colAchat = "achat";
const colEtat = "etat";

async function getOrders(file , products , carts , customers , addresses , combinations , stock) {
    const mvtStock = [];
    const orderStates = await getOrderStates();
    // console.log("orderStates" , orderStates);
    const orders = await createOrder(file , products , carts , customers , addresses , combinations , orderStates , mvtStock);
    // console.log("orders" , orders);
    const savedOrders = await saveOrders(orders , stock , mvtStock);
    // console.log("savedOrders" , savedOrders);
    return savedOrders;
}

async function createOrder(file , products , carts , customers , addresses , combinations , orderStates , mvtStock) {
    const retour = [];
    for(const item of file) {
        // console.log("item" , item);

        if(!item[colEtat]) continue ;
        const customerFound = customers.find(c => c.email === item[colEmail]);
        // console.log("customerFound" , customerFound);
        if(!customerFound) continue ;

        const cartFound = carts.find(c => c.name === item[colAchat] && c.id_customer === customerFound.id);
        // console.log("cartFound" , cartFound);
        if(!cartFound) continue ;
    
        const orderStateFound = orderStates.find(os => os.name.trim() === item[colEtat].toLowerCase().trim());
        // console.log("orderStateFound" , orderStateFound);
        if(!orderStateFound) continue ;

        const addressFound = addresses.find(a => a.address1 === item[colAdresse]);
        // console.log("addressFound" , addressFound);
        if(!addressFound) continue ;

        const {order_row , prix_ht , prix_ttc} = await createOrderRow(cartFound , products , combinations , mvtStock);
        // console.log("orderRow" , order_row);
        // console.log("prix_ht" , prix_ht);
        // console.log("prix_ttc" , prix_ttc);
        
        const order = {
            
            id_address_delivery : addressFound.id,
            id_address_invoice : addressFound.id,
            id_cart : cartFound.id,
            id_currency : currencyId,
            id_lang : langId,
            id_customer : customerFound.id,
            id_carrier : carrierId,
            current_state : orderStateFound.id,
            id_shop : 1,
            id_shop_group : 1,
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
async function createOrderRow(cart , products , combinations , mvtStock) {
    const orderRow = [];
    let prixTotalHT = 0.;
    let prixTotalTTC = 0.;
    const stockUpdates = [];
    // console.log("Creating order row for cart:", cart);
    for(const item of cart.associations.cart_rows.cart_row){
        // console.log("Processing cart item:", item);
        const productFound = products.find(p => p.id === item.id_product);
        let price = 0;
        if(item.id_product_attribute!== "0" || item.id_product_attribute !== 0){
            const combinationFound = combinations.find(c => c.id === item.id_product_attribute);
            price = combinationFound ? parseFloat(combinationFound.price)+ parseFloat(productFound.price) : parseFloat(productFound.price);
        } else {
            price = parseFloat(productFound.price);
        } 
        // console.log("Price for item:", price);
        prixTotalHT += parseFloat((price * item.quantity));
        prixTotalTTC += parseFloat((price * item.quantity * (1 + (productFound.tax.rate / 100))));
        orderRow.push({
            product_id : item.id_product,
            product_quantity : item.quantity,
            product_name : productFound ? productFound.name : "Unknown Product",
            product_attribute_id : item.id_product_attribute,
            product_price : parseFloat((price * item.quantity).toFixed(5)).toFixed(5),
            unit_price_tax_excl : parseFloat((price)).toFixed(5),
            unit_price_tax_incl : parseFloat((price * (1 + (productFound.tax.rate / 100))).toFixed(5)).toFixed(5),
            product_reference : productFound.reference,
            id_customization: 0
        });
        stockUpdates.push({
            id_product: item.id_product,
            id_product_attribute: item.id_product_attribute,
            quantity: item.quantity
        });
    }

    mvtStock.push(stockUpdates);
    
    return {
        order_row: orderRow,
        prix_ht: prixTotalHT,
        prix_ttc: prixTotalTTC
    };
}
async function saveOrders(orders , stock , mvtStock) {
    const savedOrders = [];
    let index = 0 ;
    console.log("stock" , stock);
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
                id_address_delivery : order.id_address_delivery,
                id_address_invoice : order.id_address_invoice,
            });
            if (order.current_state === 2 || order.current_state === "2") {
                const stockUpdates = mvtStock[index];
                console.log("Stock updates for order:", stockUpdates);
                for(const update of stockUpdates) {
                    const stockItem = stock.find(s => 
                        (
                            s.id_product === update.id_product 
                            || s.id_product["#text"] === update.id_product
                        ) 
                        && 
                        (
                            s.id_product_attribute === update.id_product_attribute
                            || s.id_product_attribute["#text"] === update.id_product_attribute
                        )
                    );
                    
                    const obj = await saveStockMouvement({
                        id_product: update.id_product,
                        id_product_attribute: update.id_product_attribute,
                        id_employee: 1,
                        id_warehouse: 1,
                        id_order: savedOrder.id,
                        id_stock: stockItem ? stockItem.id : 0,
                        price_te: 1,
                        id_stock_mvt_reason : 12 ,
                        sign : -1,
                        
                        physical_quantity : update.quantity<0 ? update.quantity* -1 : update.quantity,
                        date_add: order.date_add
                    })
                    await patchStockMouvement({
                        id: obj.id,
                        date_add: order.date_add,
                    });

                }
            }
            
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            index++;
        }
    }
    return savedOrders;
}



export {
    getOrders,
};