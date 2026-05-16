
import { useEffect, useState } from "react";
import { getDashboardData } from "../../service/data/DashboardService";

export default function AdminDashboard() {
    const [dailyStats, setDailyStats] = useState([]);
    const [totalsByState, setTotalsByState] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadDashboard() {
            try {
                setLoading(true);
                setError(null);
                const data = await getDashboardData();
                if (!isMounted) return;
                setDailyStats(data.dailyStats || []);
                setTotalsByState(data.totalsByState || []);
                setGrandTotal(data.grandTotal || 0);
            } catch (e) {
                if (!isMounted) return;
                setError(e);
            } finally {
                if (!isMounted) return;
                setLoading(false);
            }
        }

        loadDashboard();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load dashboard data.
            </div>
        );
    }

    const maxDailyCount = dailyStats.reduce((max, item) => Math.max(max, item.count), 0);

    return (
        <div className="space-y-8">
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Total general: {formatAmount(grandTotal)}</p>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Orders by day</h2>
                <p className="text-sm text-gray-500">{dailyStats.length} days</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">Date</th>
                                <th className="px-3 py-2">Orders</th>
                                <th className="px-3 py-2">Amount</th>
                                <th className="px-3 py-2">Histogram</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {dailyStats.map(day => (
                                <tr key={day.date}>
                                    <td className="px-3 py-2">{day.date}</td>
                                    <td className="px-3 py-2">{day.count}</td>
                                    <td className="px-3 py-2">{formatAmount(day.total)}</td>
                                    <td className="px-3 py-2">
                                        <div className="h-2 w-full rounded bg-gray-100">
                                            <div
                                                className="h-2 rounded bg-blue-500"
                                                style={{
                                                    width: maxDailyCount
                                                        ? `${Math.round((day.count / maxDailyCount) * 100)}%`
                                                        : "0%",
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">Totals by order state</h2>
                <p className="text-sm text-gray-500">{totalsByState.length} states</p>
                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-3 py-2">State</th>
                                <th className="px-3 py-2">Orders</th>
                                <th className="px-3 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {totalsByState.map(state => (
                                <tr key={state.state}>
                                    <td className="px-3 py-2">{state.state}</td>
                                    <td className="px-3 py-2">{state.count}</td>
                                    <td className="px-3 py-2">{formatAmount(state.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

function formatAmount(value) {
    const amount = Number(value);
    if (Number.isNaN(amount)) return "0.00";
    return amount.toFixed(2);
}