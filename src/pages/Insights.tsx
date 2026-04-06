import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Target, Zap, PiggyBank } from "lucide-react";

const Insights = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "expense");
    const incomes = transactions.filter(t => t.type === "income");

    // Highest spending category
    const catTotals: Record<string, number> = {};
    expenses.forEach(t => {
      catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
    });
    const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
    const highestCat = sortedCats[0] || ["N/A", 0];
    const lowestCat = sortedCats[sortedCats.length - 1] || ["N/A", 0];

    // Monthly comparison
    const monthly: Record<string, { income: number; expense: number }> = {};
    transactions.forEach(t => {
      const m = t.date.substring(0, 7);
      if (!monthly[m]) monthly[m] = { income: 0, expense: 0 };
      if (t.type === "income") monthly[m].income += t.amount;
      else monthly[m].expense += t.amount;
    });
    const months = Object.keys(monthly).sort();
    const lastMonth = months[months.length - 1];
    const prevMonth = months[months.length - 2];

    const lastData = monthly[lastMonth] || { income: 0, expense: 0 };
    const prevData = monthly[prevMonth] || { income: 0, expense: 0 };

    const expenseChange = prevData.expense > 0
      ? ((lastData.expense - prevData.expense) / prevData.expense * 100).toFixed(1)
      : "0";
    const incomeChange = prevData.income > 0
      ? ((lastData.income - prevData.income) / prevData.income * 100).toFixed(1)
      : "0";

    // Average daily spending
    const uniqueDays = new Set(expenses.map(t => t.date)).size || 1;
    const avgDaily = expenses.reduce((s, t) => s + t.amount, 0) / uniqueDays;

    // Savings rate
    const totalInc = incomes.reduce((s, t) => s + t.amount, 0);
    const totalExp = expenses.reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalInc > 0 ? ((totalInc - totalExp) / totalInc * 100).toFixed(1) : "0";

    // Largest single expense
    const largest = expenses.sort((a, b) => b.amount - a.amount)[0];

    // Category bar data
    const catBarData = sortedCats.map(([name, value]) => ({ name, value }));

    return {
      highestCat, lowestCat, expenseChange, incomeChange,
      avgDaily, savingsRate, largest, catBarData,
      lastMonth, prevMonth,
    };
  }, [transactions]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

  const insightCards = [
    {
      icon: AlertTriangle,
      title: "Highest Spending",
      value: `${CATEGORY_ICONS[insights.highestCat[0]] || "📦"} ${insights.highestCat[0]}`,
      sub: fmt(insights.highestCat[1] as number),
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      icon: Target,
      title: "Savings Rate",
      value: `${insights.savingsRate}%`,
      sub: "of income saved",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: Zap,
      title: "Avg. Daily Spend",
      value: fmt(insights.avgDaily),
      sub: "per active day",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: PiggyBank,
      title: "Lowest Category",
      value: `${CATEGORY_ICONS[insights.lowestCat[0]] || "📦"} ${insights.lowestCat[0]}`,
      sub: fmt(insights.lowestCat[1] as number),
      color: "text-info",
      bg: "bg-info/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">Smart analysis of your financial patterns</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card, i) => (
          <div key={card.title} className={`glass-card-hover rounded-xl p-5 animate-in opacity-0 stagger-${i + 1}`}>
            <div className={`p-2 rounded-lg ${card.bg} w-fit mb-3`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{card.title}</p>
            <p className="text-lg font-bold">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="glass-card rounded-xl p-5 lg:p-6 animate-in stagger-2 opacity-0">
          <h3 className="text-base font-semibold mb-4">Monthly Comparison</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm">Income Change</span>
              </div>
              <span className={`text-sm font-semibold font-mono ${parseFloat(insights.incomeChange) >= 0 ? "text-success" : "text-destructive"}`}>
                {parseFloat(insights.incomeChange) >= 0 ? "+" : ""}{insights.incomeChange}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-sm">Expense Change</span>
              </div>
              <span className={`text-sm font-semibold font-mono ${parseFloat(insights.expenseChange) <= 0 ? "text-success" : "text-destructive"}`}>
                {parseFloat(insights.expenseChange) >= 0 ? "+" : ""}{insights.expenseChange}%
              </span>
            </div>
            {insights.largest && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Largest Expense</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold font-mono">{fmt(insights.largest.amount)}</span>
                  <p className="text-xs text-muted-foreground">{insights.largest.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="glass-card rounded-xl p-5 lg:p-6 animate-in stagger-3 opacity-0">
          <h3 className="text-base font-semibold mb-4">Category Comparison</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.catBarData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "\u20B9" + v} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, "Spent"]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                  {insights.catBarData.map(entry => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "hsl(220,15%,55%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
