import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/data/mockData";

const SpendingBreakdown = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const catMap: Record<string, number> = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });
    return Object.entries(catMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card rounded-xl p-5 lg:p-6 animate-in stagger-3 opacity-0">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Spending Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Expenses by category</p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-[180px] h-[180px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map(entry => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "hsl(220,15%,55%)"} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`₹${value.toFixed(2)}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {data.slice(0, 6).map(item => {
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center gap-3 text-sm">
                <span className="text-base">{CATEGORY_ICONS[item.name] || "📦"}</span>
                <span className="flex-1 truncate">{item.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{pct}%</span>
                <span className="font-medium w-20 text-right font-mono text-xs">₹{item.value.toFixed(0)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
