import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_ICONS } from "@/data/mockData";

const RecentTransactions = () => {
  const { transactions } = useFinance();

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  }, [transactions]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

  if (recent.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 animate-in stagger-4 opacity-0">
        <h3 className="text-base font-semibold mb-4">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground text-center py-8">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-5 lg:p-6 animate-in stagger-4 opacity-0">
      <h3 className="text-base font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {recent.map(t => (
          <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
            <span className="text-xl w-8 text-center">{CATEGORY_ICONS[t.category] || "📦"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.description}</p>
              <p className="text-xs text-muted-foreground">{t.category} · {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
            </div>
            <span className={`text-sm font-semibold font-mono ${t.type === "income" ? "text-success" : "text-destructive"}`}>
              {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
