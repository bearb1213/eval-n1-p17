import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import CartDrawer from './cart/CartDrawer';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../service/order/OrderService';
import OrderTable from './order/OrderTable';
import EmptyState from './order/EmptyState';
import { createOrder } from '../service/cart/CartService';

export default function ShopLayout() {
    const [cartOpen, setCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [showOrders, setShowOrders] = useState(false);
    const [orders, setOrders] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [ordersError, setOrdersError] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [loadingOrderCreate, setLoadingOrderCreate] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedCustomer = localStorage.getItem("customer");
        if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer));
        }
       
    }, [])
    useEffect(() => {
        if (!customer) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            setIsAnonymous(customer.isAnnonymous || false);
        }
    }, [customer])
    useEffect(() => {
        const reload = sessionStorage.getItem("reload");
        if (reload === "reload"){
            sessionStorage.removeItem("reload");
            window.location.reload();
        }
        // window.location.reload();
    } , [])

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        try {
            const parsed = storedCart ? JSON.parse(storedCart) : [];
            setCartItems(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
            setCartItems([]);
        }
    }, []);

    useEffect(() => {
        if (!cartOpen) {
            return;
        }
        const storedCart = localStorage.getItem("cart");
        try {
            const parsed = storedCart ? JSON.parse(storedCart) : [];
            setCartItems(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
            setCartItems([]);
        }
    }, [cartOpen]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!showOrders) {
                return;
            }
            if (!customer || isAnonymous) {
                setOrders([]);
                return;
            }
            setLoadingOrders(true);
            setOrdersError("");
            try {
                const allOrders = await getOrders();
                const filtered = allOrders.filter(
                    (order) => String(order.id_customer) === String(customer.id)
                );
                setOrders(filtered);
            } catch (error) {
                setOrdersError("Erreur lors du chargement des commandes.");
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [showOrders, customer, isAnonymous]);
    
    const handleToggleCart = () => {
        setCartOpen((prev) => !prev);
    };

    const handleRemoveCartItem = (itemToRemove) => {
        const updated = cartItems.filter((item) => {
            const productMatch = String(item.productId || item.id) === String(itemToRemove.productId || itemToRemove.id);
            const comboMatch = String(item.comboId || "base") === String(itemToRemove.comboId || "base");
            return !(productMatch && comboMatch);
        });
        localStorage.setItem("cart", JSON.stringify(updated));
        setCartItems(updated);
    };

    const handleToggleLogin = () => {
        if (isLoggedIn) {
            localStorage.removeItem("customer");
            localStorage.removeItem("guest");
            localStorage.removeItem("orders");
            localStorage.removeItem("cart");
            localStorage.removeItem("cartId");

            sessionStorage.setItem("reload", "reload");
            
            setCustomer(null);
            setIsLoggedIn(false);
            navigate("/customers");
        } else {
            sessionStorage.setItem("reload", "reload");
            
            navigate("/customers" );
        }
    };

    const handleToggleOrders = () => {
        setShowOrders((prev) => !prev);
    };

    const toggleExpand = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };
    const handleViewProducts = () => {
        sessionStorage.setItem("reload", "reload");
        navigate("/products" );
    }
    const handleRefraish = () => {
        navigate("/products?reload=2" );
    }

    const handleCreateOrder = async () => {
        if (loadingOrderCreate) {
            return;
        }
        setLoadingOrderCreate(true);
        const storedCustomer = localStorage.getItem("customer");
        const storedGuest = localStorage.getItem("guest");
        const storedCart = localStorage.getItem("cart");
        const storedCartId = localStorage.getItem("cartId");
        const customerSave = storedCustomer ? JSON.parse(storedCustomer) : null;
        const guestSave = storedGuest ? JSON.parse(storedGuest) : null;
        const cartSave = storedCart ? JSON.parse(storedCart) : [];
        const cartIdSave = storedCartId ? Number(storedCartId) : null;
        if (!customerSave || customerSave.isAnnonymous) {
            alert("Vous devez être connecté pour passer une commande.");
            return;
        } 
        if (cartSave.length === 0) {
            alert("Votre panier est vide.");
            return;
        }
        if (!cartIdSave) {
            alert("Aucun panier actif trouvé.");
            return;
        }
        try {
            const result = await createOrder(
                customerSave,
                guestSave ? guestSave.id : 0,
                cartIdSave,
                cartSave
            );
            alert("Commande créée avec succès !");
            localStorage.removeItem("cart");
            localStorage.removeItem("cartId");
            sessionStorage.setItem("reload", "reload");
            navigate("/products");
        } catch (error) {   
            alert("Erreur lors de la création de la commande.");
        } finally {
            setLoadingOrderCreate(false);
        }
    }

  return (
    <>
      <NavBar
        userName={customer ? customer.firstName : "Invité"}
        isLoggedIn={isLoggedIn}
        onToggleCart={handleToggleCart}
        onToggleLogin={handleToggleLogin}
        onRefresh={handleRefraish}
      />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemoveItem={handleRemoveCartItem}
        onCreateOrder={handleCreateOrder}
                canCreateOrder={isLoggedIn && !isAnonymous && cartItems.length > 0}
                isCreatingOrder={loadingOrderCreate}
      />
            {isLoggedIn && !isAnonymous && (
                <div className="mx-auto w-full max-w-6xl px-4 py-3">
                    <button
                        type="button"
                        onClick={handleToggleOrders}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        {showOrders ? "Masquer mes commandes" : "Voir mes commandes"}
                    </button>
                    {window.location.pathname === "/customers" && (

                        <button
                        type="button"
                        onClick={handleViewProducts}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        
                        >
                            Voir Products
                    </button>
                    )}
                </div>
            )}
            {showOrders && isLoggedIn && !isAnonymous && (
                <div className="mx-auto w-full max-w-6xl px-4 pb-6">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {loadingOrders ? (
                            <div className="p-6 text-center text-gray-500">Chargement...</div>
                        ) : ordersError ? (
                            <div className="p-6 text-center text-red-600">{ordersError}</div>
                        ) : (
                            <OrderTable
                                orders={orders}
                                expandedId={expandedId}
                                onToggle={toggleExpand}
                                stateOptions={[]}
                                onChangeState={() => {}}
                            />
                        )}
                        {!loadingOrders && !ordersError && orders.length === 0 && <EmptyState />}
                    </div>
                </div>
            )}
      <Outlet />
    </>
  );
}
