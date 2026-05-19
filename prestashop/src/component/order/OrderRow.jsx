import { Fragment, useState } from "react";
import OrderDetails from "./OrderDetails";
import OrderStateBadge from "./OrderStateBadge";
import {saveOrderHistory} from "../../service/order/OrderHistoryApi"
import { createOrderWithButton } from "../../service/cart/CartService"; 


export default function OrderRow({
  order,
  isExpanded,
  onToggle,
  stateOptions,
  onChangeState,
  isAdmin = false,
}) {
  const clientName = order.customer
    ? `${order.customer.firstname} ${order.customer.lastname}`
    : "Guest";
  let stateName = order.orderState?.name || "Inconnu";
  const isCartState = stateName === "Dans le panier";
  const isClosedState = stateName === "Annulé" || stateName === "Livré";
  const isRemotePaymentAccepted = stateName === "Paiement à distance accepté";

  const handleOrder = async (event , idOrder) => {
    // event.stopPropagation();
    try {
      await createOrderWithButton(idOrder);
    } catch (error) {
      console.error("Failed to create order", error);
      alert("Erreur lors de la création de la commande : " + error.message);
    }
    alert("Commander "+idOrder);
  };

  const handleCancel = async (event, idOrder) => {
    // event.stopPropagation();
    try {
      await saveOrderHistory({
        id_order: idOrder,
        id_order_state: 6,
      });
      stateName = "Annulé";
      // alert(`cancel ${idOrder}`);
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  const handleDeliver = async (event, idOrder) => {
    // event.stopPropagation();
    try {
      await saveOrderHistory({
        id_order: idOrder,
        id_order_state: 5,
      });
      // window.local
      let stateName = "Livré";
      alert(`Deliver ${idOrder}`);

    } catch (error) {
      console.error("Failed to deliver order", error);
    }
  };

  return (
    <Fragment>
      <tr
        onClick={() => onToggle(order.id)}
        className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${
          isExpanded ? "bg-blue-50/60" : "bg-white"
        }`}
      >
        <td className="px-4 py-3 font-medium text-gray-900">#{order.id}</td>
        <td className="px-4 py-3 hidden sm:table-cell">{order.reference}</td>
        <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap">
          {new Date(order.date_add).toLocaleDateString()}
        </td>
        <td className="px-4 py-3">{clientName}</td>
        <td className="px-4 py-3 hidden lg:table-cell font-medium">
          {parseFloat(order.total_paid_tax_incl).toFixed(2)} €
        </td>
        <td className="px-4 py-3 hidden lg:table-cell">
          {parseFloat(order.total_paid_tax_excl).toFixed(2)} €
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <OrderStateBadge stateName={stateName} />
            </div>
            {!isClosedState && isAdmin && (
              <div className="flex items-center gap-2">
                
                {isRemotePaymentAccepted && (
                  <>
                    <button
                      type="button"
                      className="rounded border border-red-500 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      onClick={(e)=> {handleCancel(e,order.id)}}
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      className="rounded border border-green-500 px-2 py-1 text-xs font-medium text-green-600 hover:bg-green-50"
                      onClick={(e)=> {handleDeliver(e,order.id)}}
                    >
                      Livrer
                    </button>
                  </>
                )}
              </div>
            )}
            {isCartState && (
              <div className="flex items-center gap-2">

                  <button
                    type="button"
                    className="rounded border border-blue-500 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                    onClick={(e)=> {handleOrder(e,order.id)}}
                  >
                    Commander
                  </button>
              </div>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <button className="text-gray-400 hover:text-gray-600 transition">
            {isExpanded ? "▲" : "▼"}
          </button>
        </td>
      </tr>
      {isExpanded && <OrderDetails order={order} />}
    </Fragment>
  );
}
