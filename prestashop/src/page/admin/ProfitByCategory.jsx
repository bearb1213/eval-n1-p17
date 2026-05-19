import { useEffect, useMemo, useState } from "react";
import { getProfitByCategory, getStockByCategory } from "../../service/admin/StatisticService";

export default function ProfitByCategory() {
    const [summary, setSummary] = useState({
        totalSalesHT: 0,
        totalPurchaseHT: 0,
        totalAchatHt: 0,
        profitByCategory: [],
        achatByCategoryId: new Map(),
    });
    const [stockByCategory, setStockByCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadStats() {
            try {
                setLoading(true);
                setError(null);
                const [profitData, stockData] = await Promise.all([
                    getProfitByCategory(),
                    getStockByCategory(),
                ]);
                if (!isMounted) return;
                setSummary({
                    totalSalesHT: profitData.totalSalesHT || 0,
                    totalPurchaseHT: profitData.totalPurchaseHT || 0,
                    totalAchatHt: profitData.totalAchatHt || 0,
                    profitByCategory: profitData.profitByCategory || [],
                    achatByCategoryId: profitData.achatByCategoryId || new Map(),
                });
                setStockByCategory(stockData || []);
            } catch (e) {
                if (!isMounted) return;
                setError(e);
            } finally {
                if (!isMounted) return;
                setLoading(false);
            }
        }

        loadStats();
        return () => {
            isMounted = false;
        };
    }, []);

    const totalProfit = useMemo(
        () => summary.totalSalesHT - summary.totalPurchaseHT,
        [summary.totalSalesHT, summary.totalPurchaseHT]
    );
    const totalRealProfit = useMemo(
        () => summary.totalSalesHT - summary.totalAchatHt,
        [summary.totalSalesHT, summary.totalAchatHt]
    );

    if (loading) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                Chargement des statistiques...
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Impossible de charger les statistiques.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold text-gray-800">
                    Statistiques par categorie
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Synthese des ventes, achats et benefices (HT).
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-5">
                    <StatCard
                        label="Total ventes HT"
                        value={formatAmount(summary.totalSalesHT)}
                    />
                    <StatCard
                        label="Total achats HT"
                        value={formatAmount(summary.totalPurchaseHT)}
                    />
                    <StatCard
                        label="Total achat stock HT"
                        value={formatAmount(summary.totalAchatHt)}
                    />
                    <StatCard
                        label="Benefice HT"
                        value={formatAmount(totalProfit)}
                    />
                    <StatCard
                        label="Benefice reel HT"
                        value={formatAmount(totalRealProfit)}
                    />
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                    Details par categorie
                </h2>
                <p className="text-sm text-gray-500">
                    {summary.profitByCategory.length} categories
                </p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">Categorie</th>
                                <th className="px-3 py-2">Ventes HT</th>
                                <th className="px-3 py-2">Achats HT</th>
                                <th className="px-3 py-2">Achat stock HT</th>
                                <th className="px-3 py-2">Benefice HT</th>
                                <th className="px-3 py-2">Benefice reel HT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {summary.profitByCategory.map(category => (
                                <tr key={category.categoryId}>
                                    <td className="px-3 py-2">
                                        {category.categoryName}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatAmount(category.totalSalesHT)}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatAmount(category.totalPurchaseHT)}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatAmount(
                                            summary.achatByCategoryId.get(
                                                category.categoryId
                                            )?.purchaseHT
                                        )}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatAmount(category.profitHT)}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatAmount(
                                            category.totalSalesHT -
                                                (summary.achatByCategoryId.get(
                                                    category.categoryId
                                                )?.purchaseHT || 0)
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                    Stock par categorie
                </h2>
                <p className="text-sm text-gray-500">
                    {stockByCategory.length} categories
                </p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">Categorie</th>
                                <th className="px-3 py-2">Qte dispo</th>
                                <th className="px-3 py-2">Qte physique</th>
                                <th className="px-3 py-2">Qte reservee</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {stockByCategory.map(category => (
                                <tr key={category.categoryId}>
                                    <td className="px-3 py-2">
                                        {category.categoryName}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatQuantity(category.Qtedispo)}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatQuantity(category.Qtephysique)}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatQuantity(category.Qtereserver)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <div className="text-xs uppercase text-gray-500">{label}</div>
            <div className="mt-1 text-lg font-semibold text-gray-800">{value}</div>
        </div>
    );
}

function formatAmount(value) {
    const amount = Number(value);
    if (Number.isNaN(amount)) return "0.00";
    return amount.toFixed(2);
}

function formatQuantity(value) {
    const amount = Number(value);
    if (Number.isNaN(amount)) return "0";
    return amount.toFixed(0);
}
