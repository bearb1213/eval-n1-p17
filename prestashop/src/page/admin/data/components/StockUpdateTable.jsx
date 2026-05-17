import { Fragment } from "react";
import { buildKey, formatMovement, groupMovementsByDay } from "../StockUpdateUtils";

export default function StockUpdateTable({
    rows,
    pendingAdds,
    savingKey,
    movementByKey,
    onChange,
    onAddStock,
    onToggleMovements,
}) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="overflow-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-left text-gray-600">
                        <tr>
                            <th className="px-3 py-2">Produit</th>
                            <th className="px-3 py-2">Combinaison</th>
                            <th className="px-3 py-2">Stock actuel</th>
                            <th className="px-3 py-2">Ajouter</th>
                            <th className="px-3 py-2">Action</th>
                            <th className="px-3 py-2">Mouvements</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {rows.map(row => {
                            const key = buildKey(row.productId, row.attributeId);
                            const movementState = movementByKey[key];
                            const groupedMovements = movementState?.data
                                ? groupMovementsByDay(movementState.data)
                                : [];

                            return (
                                <Fragment key={key}>
                                    <tr>
                                        <td className="px-3 py-2">
                                            {row.productName}
                                            <span className="ml-2 text-xs text-gray-400">
                                                #{row.productId}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">
                                            {row.combinationLabel || "-"}
                                        </td>
                                        <td className="px-3 py-2">{row.stockQty}</td>
                                        <td className="px-3 py-2">
                                            <input
                                                type="number"
                                                value={pendingAdds[key] || ""}
                                                onChange={(e) => onChange(key, e.target.value)}
                                                className="w-24 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </td>
                                        <td className="px-3 py-2">
                                            <button
                                                type="button"
                                                onClick={() => onAddStock(row.productId, row.attributeId)}
                                                disabled={savingKey === key}
                                                className={`rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 ${savingKey === key ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                {savingKey === key ? "Mise a jour..." : "Ajouter"}
                                            </button>
                                        </td>
                                        <td className="px-3 py-2">
                                            <button
                                                type="button"
                                                onClick={() => onToggleMovements(row)}
                                                disabled={!row.stockId || movementState?.loading}
                                                className={`rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 ${!row.stockId || movementState?.loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                {movementState?.loading
                                                    ? "Chargement..."
                                                    : movementState?.open
                                                    ? "Masquer"
                                                    : "Voir"}
                                            </button>
                                        </td>
                                    </tr>
                                    {movementState?.open ? (
                                        <tr>
                                            <td className="px-3 py-2" colSpan={6}>
                                                <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                                                    {movementState?.error ? (
                                                        <span className="text-red-600">
                                                            Erreur lors du chargement des mouvements.
                                                        </span>
                                                    ) : groupedMovements.length === 0 ? (
                                                        <span>Aucun mouvement pour ce stock.</span>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {groupedMovements.map(group => (
                                                                <div key={group.day}>
                                                                    <div className="flex flex-wrap items-center gap-3 font-semibold text-gray-800">
                                                                        <span>{group.day}</span>
                                                                        <span className="text-xs font-medium text-gray-600">
                                                                            Total: {group.total}
                                                                        </span>
                                                                    </div>
                                                                    <ul className="ml-4 list-disc">
                                                                        {group.items.map((item, index) => (
                                                                            <li key={`${group.day}-${index}`}>
                                                                                {formatMovement(item)}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
