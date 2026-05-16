export default function CartDrawer({ open, items, onClose, onRemoveItem, onCreateOrder, canCreateOrder, isCreatingOrder }) {
    const handleVidePanier = () => {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartId");
        onClose();
    }
  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-sm transform bg-white shadow-lg transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">Panier</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={handleVidePanier}
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            Vider le panier
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Votre panier est vide.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={`${item.productId || item.id}-${item.comboId || "base"}`}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {item.productname || item.name}
                    </p>
                    {item.optionsName && (
                      <p className="text-xs text-gray-500">{item.optionsName}</p>
                    )}
                    <p className="text-xs text-gray-500">Quantite: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-semibold text-gray-700">unit price : {(item.price).toFixed(2)} Ar</span>
                    <span className="block text-sm font-semibold text-gray-700">total : {(item.price * item.qty).toFixed(2)} Ar</span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item)}
                      className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {canCreateOrder && (
            <button
              type="button"
              onClick={onCreateOrder}
              disabled={isCreatingOrder}
              className={`mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 ${isCreatingOrder ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isCreatingOrder ? "Commande..." : "Commander"}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
 