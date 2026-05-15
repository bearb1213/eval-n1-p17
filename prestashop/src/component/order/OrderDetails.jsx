export default function OrderDetails({ order }) {
  if (!order.order_row || order.order_row.length === 0) {
    return (
      <tr className="bg-gray-50">
        <td colSpan={8} className="px-4 py-3 text-center text-sm text-gray-500">
          Aucun detail de produit disponible.
        </td>
      </tr>
    );
  }

  return (
    <tr className="bg-gray-50">
      <td colSpan={8} className="px-4 py-3">
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="px-3 py-2 text-left">Qte</th>
                <th className="px-3 py-2 text-left">Produit</th>
                <th className="px-3 py-2 text-left hidden sm:table-cell">
                  Ref.
                </th>
                <th className="px-3 py-2 text-right">P.U. HT</th>
                <th className="px-3 py-2 text-right">P.U. TTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.order_row.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2">{row.product_quantity}</td>
                  <td className="px-3 py-2 font-medium text-gray-900">
                    {row.product_name}
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell text-gray-500">
                    {row.product_reference}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {parseFloat(row.unit_price_tax_excl).toFixed(2)} €
                  </td>
                  <td className="px-3 py-2 text-right">
                    {parseFloat(row.unit_price_tax_incl).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {order.cart?.carts?.length > 0 && (
          <p className="mt-2 text-xs text-gray-500">
            🛒 Panier : {order.cart.carts.length} article(s)
          </p>
        )}
      </td>
    </tr>
  );
}
