import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { useFinance } from "@/context/FinanceContext";

const Dashboard = () => {
  const { role } = useFinance();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here's your financial overview.
          {role === "viewer" && (
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">View Only</span>
          )}
        </p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>

      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
