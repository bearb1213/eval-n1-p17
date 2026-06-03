import { getOrderLiverPayer } from "../order/OrderService";

async function getDashboardData(dateRange = {}) {
    try {
        const orders = await getOrderLiverPayer();

        return buildDashboardStats(orders, dateRange);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function buildDashboardStats(orders, dateRange = {}) {
    const normalizedOrders = Array.isArray(orders) ? orders : [];
    const startDate = dateRange.startDate || "";
    const endDate = dateRange.endDate || "";
    const dailyMap = new Map();
    const stateMap = new Map();
    let grandTotal = 0;

    normalizedOrders.forEach(order => {
        const dateKey = extractDateKey(order.date_add);
        const amount = toNumber(order.total_paid_tax_incl ?? order.total_paid);

        if (startDate || endDate) {
            if (!dateKey) {
                return;
            }
            if (startDate && dateKey < startDate) {
                return;
            }
            if (endDate && dateKey > endDate) {
                return;
            }
        }

        const stateKey = order.orderState?.name || String(order.current_state || "Unknown");
        if (dateKey) {
            const daily = dailyMap.get(dateKey) || {
                date: dateKey,
                count: 0,
                total: 0,
                stateCounts: new Map(),
            };
            daily.count += 1;
            daily.total += amount;
            daily.stateCounts.set(stateKey, (daily.stateCounts.get(stateKey) || 0) + 1);
            dailyMap.set(dateKey, daily);
        }

        const state = stateMap.get(stateKey) || { state: stateKey, count: 0, total: 0 };
        state.count += 1;
        state.total += amount;
        stateMap.set(stateKey, state);

        grandTotal += amount;
    });

    const dailyStats = Array.from(dailyMap.values())
        .map(day => ({
            ...day,
            stateCounts: Array.from(day.stateCounts.entries())
                .map(([state, count]) => ({ state, count }))
                .sort((a, b) => b.count - a.count),
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
    const totalsByState = Array.from(stateMap.values()).sort((a, b) =>
        b.total - a.total
    );

    return {
        dailyStats,
        totalsByState,
        grandTotal,
    };
}

function extractDateKey(value) {
    if (!value) return "";
    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }
    if (typeof value === "string") {
        return value.split(" ")[0];
    }
    return String(value);
}

function toNumber(value) {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
}

export {
    getDashboardData,
};