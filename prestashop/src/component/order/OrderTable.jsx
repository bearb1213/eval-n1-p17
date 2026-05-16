import OrderRow from "./OrderRow";

export default function OrderTable({
  orders,
  expandedId,
  onToggle,
  stateOptions,
  onChangeState,
  isAdmin = false,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3 hidden sm:table-cell">Reference</th>
            <th className="px-4 py-3 hidden md:table-cell">Date</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3 hidden lg:table-cell">
              Total paye (TTC)
            </th>
            <th className="px-4 py-3 hidden lg:table-cell">Total HT</th>
            <th className="px-4 py-3">Etat</th>
            <th className="px-4 py-3 text-center">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              isExpanded={expandedId === order.id}
              onToggle={onToggle}
              stateOptions={stateOptions}
              onChangeState={onChangeState}
              isAdmin={isAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
