import { useFinance } from "@/context/FinanceContext";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

  const cards = [
    {
      label: "Total Balance",
      value: fmt(totalBalance),
      icon: Wallet,
      trend: totalBalance >= 0 ? "+positive" : "negative",
      color: "primary" as const,
      sub: "Net worth overview",
    },
    {
      label: "Total Income",
      value: fmt(totalIncome),
      icon: TrendingUp,
      trend: "+12.5% vs last month",
      color: "success" as const,
      sub: "All income sources",
    },
    {
      label: "Total Expenses",
      value: fmt(totalExpenses),
      icon: TrendingDown,
      trend: "-3.2% vs last month",
      color: "destructive" as const,
      sub: "All spending",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className={`glass-card-hover rounded-xl p-5 lg:p-6 animate-in stagger-${i + 1} opacity-0`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${
                card.color === "primary" ? "bg-primary/10" :
                card.color === "success" ? "bg-success/10" :
                "bg-destructive/10"
              }`}>
                <card.icon className={`h-5 w-5 ${
                  card.color === "primary" ? "text-primary" :
                  card.color === "success" ? "text-success" :
                  "text-destructive"
                }`} />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
            </div>
            {card.color === "success" ? (
              <ArrowUpRight className="h-4 w-4 text-success" />
            ) : card.color === "destructive" ? (
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            ) : null}
          </div>
          <p className="text-2xl lg:text-3xl font-bold tracking-tight count-up">{card.value}</p>
          <p className="text-xs text-muted-foreground mt-2">{card.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
