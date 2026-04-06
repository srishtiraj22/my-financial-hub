import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORIES, CATEGORY_ICONS } from "@/data/mockData";
import type { Category, TransactionType } from "@/data/mockData";
import { Search, SlidersHorizontal, ArrowUpDown, Plus, Pencil, Trash2, Download, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Transactions = () => {
  const {
    filteredTransactions, filters, setFilters, role,
    addTransaction, editTransaction, deleteTransaction,
  } = useFinance();

  const [showFilters, setShowFilters] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    description: "", amount: "", type: "expense" as TransactionType,
    category: "Food & Dining" as Category, date: new Date().toISOString().split("T")[0],
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

  const openAdd = () => {
    setEditingId(null);
    setForm({ description: "", amount: "", type: "expense", category: "Food & Dining", date: new Date().toISOString().split("T")[0] });
    setDialogOpen(true);
  };

  const openEdit = (t: typeof filteredTransactions[0]) => {
    setEditingId(t.id);
    setForm({ description: t.description, amount: t.amount.toString(), type: t.type, category: t.category, date: t.date });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    const amount = parseFloat(form.amount);
    if (!form.description || isNaN(amount) || amount <= 0) return;
    if (editingId) {
      editTransaction(editingId, { ...form, amount });
    } else {
      addTransaction({ ...form, amount });
    }
    setDialogOpen(false);
  };

  const exportCSV = () => {
    const header = "Date,Description,Amount,Type,Category\n";
    const rows = filteredTransactions.map(t =>
      `${t.date},"${t.description}",${t.amount},${t.type},${t.category}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const allCategories = [...new Set([...CATEGORIES.income, ...CATEGORIES.expense])];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-1">{filteredTransactions.length} transactions found</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
            <Download className="h-4 w-4" /> Export
          </Button>
          {role === "admin" && (
            <Button size="sm" onClick={openAdd} className="gap-1.5 gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4" /> Add
            </Button>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-card rounded-xl p-4 space-y-3 animate-in opacity-0">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              className="pl-9"
            />
          </div>
          <Button
            variant={showFilters ? "secondary" : "outline"}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setFilters(f => ({
                ...f,
                sortOrder: f.sortOrder === "desc" ? "asc" : "desc",
              }))
            }
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/50">
            <Select value={filters.type} onValueChange={v => setFilters(f => ({ ...f, type: v as any }))}>
              <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.category} onValueChange={v => setFilters(f => ({ ...f, category: v as any }))}>
              <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={e => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
              className="h-9 text-xs"
              placeholder="From"
            />
            <Input
              type="date"
              value={filters.dateTo}
              onChange={e => setFilters(f => ({ ...f, dateTo: e.target.value }))}
              className="h-9 text-xs"
              placeholder="To"
            />
          </div>
        )}

        {(filters.search || filters.type !== "all" || filters.category !== "all" || filters.dateFrom || filters.dateTo) && (
          <button
            onClick={() => setFilters({ search: "", type: "all", category: "all", dateFrom: "", dateTo: "", sortBy: "date", sortOrder: "desc" })}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear all filters
          </button>
        )}
      </div>

      {/* Transaction list */}
      {filteredTransactions.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm font-medium">No transactions found</p>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTransactions.map((t, i) => (
            <div
              key={t.id}
              className="glass-card-hover rounded-xl p-4 flex items-center gap-3"
              style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
            >
              <span className="text-xl w-9 h-9 flex items-center justify-center rounded-lg bg-muted/50">
                {CATEGORY_ICONS[t.category] || "📦"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground">
                  {t.category} · {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold font-mono ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                  {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
                </span>
                {role === "admin" && (
                  <div className="flex gap-1 ml-2">
                    <button onClick={() => openEdit(t)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => deleteTransaction(t.id)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input
              placeholder="Description"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              min="0"
              step="0.01"
            />
            <div className="grid grid-cols-2 gap-2">
              <Select value={form.type} onValueChange={v => {
                const newType = v as TransactionType;
                setForm(f => ({ ...f, type: newType, category: CATEGORIES[newType][0] }));
              }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Category }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES[form.type].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} className="gradient-primary text-primary-foreground">
              {editingId ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
