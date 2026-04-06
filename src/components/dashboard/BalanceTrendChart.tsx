import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BalanceTrendChart = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    const monthly: Record<string, { income: number; expense: number }> = {};

    sorted.forEach(t => {
      const month = t.date.substring(0, 7);
      if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
      if (t.type === "income") monthly[month].income += t.amount;
      else monthly[month].expense += t.amount;
    });

    let balance = 0;
    return Object.entries(monthly).map(([month, { income, expense }]) => {
      balance += income - expense;
      const label = new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      return { month: label, income, expense, balance };
    });
  }, [transactions]);

  return (
    <div className="glass-card rounded-xl p-5 lg:p-6 animate-in stagger-2 opacity-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold">Balance Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly income vs expenses</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Income</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-destructive" />Expenses</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-info" />Balance</span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "\u20B9" + (v / 1000).toFixed(1) + "k"} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
              }}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, ""]}
            />
            <Area type="monotone" dataKey="income" stroke="hsl(38, 92%, 50%)" fill="url(#incomeGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="expense" stroke="hsl(0, 72%, 51%)" fill="url(#expenseGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="balance" stroke="hsl(217, 91%, 60%)" fill="none" strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrendChart;
