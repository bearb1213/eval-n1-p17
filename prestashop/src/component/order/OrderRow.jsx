import { Fragment, useState } from "react";
import OrderDetails from "./OrderDetails";
import OrderStateBadge from "./OrderStateBadge";

export default function OrderRow({
  order,
  isExpanded,
  onToggle,
  stateOptions,
  onChangeState,
  isAdmin = false,
}) {
  const [isEditingState, setIsEditingState] = useState(false);
  const clientName = order.customer
    ? `${order.customer.firstname} ${order.customer.lastname}`
    : "Inconnu";
  const stateName = order.orderState?.name || "Inconnu";

  const currentStateId = String(
    order.orderState?.id ?? order.current_state ?? ""
  );
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
            {!isEditingState && (
              <div className="flex items-center gap-2">
                <OrderStateBadge stateName={stateName} />
                {isAdmin && (
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-800"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsEditingState(true);
                    }}
                  >
                    Changer
                  </button>
                )}
              </div>
            )}
            {isEditingState && (
              <select
                className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700"
                value={currentStateId}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => {
                  event.stopPropagation();
                  onChangeState(order.id, event.target.value);
                  setIsEditingState(false);
                }}
                onBlur={() => setIsEditingState(false)}
              >
                {stateOptions.map((state) => (
                  <option key={state.id} value={String(state.id)}>
                    {state.name}
                  </option>
                ))}
              </select>
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
