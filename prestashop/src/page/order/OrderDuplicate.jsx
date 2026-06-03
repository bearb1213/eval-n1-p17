
import { useParams , useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

import { getOrderByCustomerIdAndId } from "../../service/order/OrderService"
import { use } from "react";
import OrderDetails from "../../component/order/OrderDetails"
import OrderRow from "../../component/order/OrderRow";
import StockChecking from "../../component/order/StockChecking";
import { createOrderWoutCart } from "../../service/order/OrderService";

export default function OrderDuplicate(){

    const {id} =  useParams();
    const [order , setOrder] = useState({});
    const [error , setError] = useState("");
    const navigate = useNavigate();
    const [duplication , setDuplication ] = useState(1);
    const [orderDupl , setOrderDupl] = useState({})
    const [products , setProducts] = useState([]);
    const [canCommande , setCanCommande] = useState(false);

    const onChangeData = (e)=> {
        setDuplication(e.target.value)
        const dupl = Number(e.target.value);
        const orderModified = [];
        for(const orderRow of order.order_row){
            // console.log(orderRow);
            orderModified.push({
                id: orderRow.id,
                product_name: orderRow.product_name,
                product_price: Number(orderRow.product_price) * Number(orderRow.product_quantity) * dupl,
                product_attribute_id : orderRow.product_attribute_id,
                product_id: orderRow.product_id,
                product_quantity : Number(orderRow.product_quantity) * dupl ,
                product_reference : orderRow.product_reference,
                unit_price_tax_excl : Number(orderRow.unit_price_tax_excl),
                unit_price_tax_incl : Number(orderRow.unit_price_tax_incl),

            })
        }
        const cartModified = []
        for(const cartRow of order.cart.carts){
            cartModified.push({
                ...cartRow ,
                quantity : Number(cartRow.quantity) * dupl
            })
        }


        // console.log(orderModified);
        setOrderDupl({
            ...orderDupl , 
            total_can_paid : Number(order.total_can_paid) * dupl,
            total_paid : Number(order.total_paid) * dupl ,
            total_paid_real: Number(order.total_paid_real) * dupl ,
            total_paid_tax_excl: Number(order.total_paid_tax_excl) * dupl ,
            total_paid_tax_incl: Number(order.total_paid_tax_incl) * dupl ,
            order_row: orderModified , 
            cart : {... order.cart , carts : cartModified},
        });

    }


    useEffect(()=>{
        try {

            const fetchData = async () => {
                const customer = JSON.parse(localStorage.getItem("customer"));
                console.log("customer ",customer)
                if(!customer) navigate("/");
                const orderFetched = await getOrderByCustomerIdAndId(customer.id,id)
                setOrder(orderFetched);
                setOrderDupl(orderFetched);
                const pts = JSON.parse(localStorage.getItem("products") || "[]");
                // setProducts(pts);
                const productUse = []
                for(const orderRow of orderFetched.order_row){
                    const productFound = pts.find(p=> p.id == orderRow.product_id["#text"]);
                    if(productFound){
                        await productUse.push({...productFound });
                    }
                }

                setProducts(productUse);

            }
            
            fetchData();
        } catch (error) {
            setError(error.message)
        }
    } , []);

    useEffect(()=> {
        console.log(products);
    },[products])

    // useEffect(()=>{
    //     console.log("order duple " , orderDupl)
    // },[orderDupl])

    const handleCommande = async ()=> {
        try {
            // console.log("commande : ",orderDupl);
            const customer = JSON.parse(localStorage.getItem("customer"));

            const orderCreate = await createOrderWoutCart(orderDupl,customer.id);

            console.log(orderCreate);
            alert("commande reussi ");
            navigate("/products?reload=2")
        } catch (error) {
            console.log(error);
            alert("error "+error.message )
        }

    };

    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">Duplication de commande</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Ajustez le nombre de duplications et verifiez le detail.
                        </p>
                    </div>
                    <div className="flex items-end gap-3">
                        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                            Nb duplication
                        </label>
                        <input
                            id="quantity"
                            className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="number"
                            min="1"
                            value={duplication}
                            onChange={onChangeData}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <OrderDetails order={orderDupl} />
                </div>
                <div className="mt-6">
                    <StockChecking orders={orderDupl} products={products} setCanCommande={setCanCommande} />
                </div>
                <div className="mt-6">
                    <button 
                        disabled={!canCommande}
                        className={`rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 ${!canCommande ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e)=> {handleCommande()}}
                    >
                        commander                        
                    </button>
                </div>
            </div>
        </div>
    );

}