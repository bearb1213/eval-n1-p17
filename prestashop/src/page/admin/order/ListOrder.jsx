import {
  changeStateOrder,
  getOrders,
} from "../../../service/order/OrderService";
import { useEffect, useState } from "react";
import EmptyState from "../../../component/order/EmptyState";
import OrderTable from "../../../component/order/OrderTable";

export default function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // ID de la commande ouverte
  const stateOptions = [
    { id: 2, name: "Paiement accepté" },
    { id: 6, name: "Annulé" },
  ];

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleChangeState = async (orderId, newStateId) => {
    try {
      const resultStateId = await changeStateOrder(orderId, newStateId);
      const selectedState = stateOptions.find(
        (state) => String(state.id) === String(resultStateId)
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                current_state: String(resultStateId),
                orderState: {
                  id: String(resultStateId),
                  name: selectedState?.name || order.orderState?.name,
                },
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error changing state:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <OrderTable
        orders={orders}
        expandedId={expandedId}
        onToggle={toggleExpand}
        stateOptions={stateOptions}
        onChangeState={handleChangeState}
        isAdmin={true}
      />
      {orders.length === 0 && <EmptyState />}
    </div>
  );
}