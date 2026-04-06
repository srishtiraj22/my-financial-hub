import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { Transaction, Role, mockTransactions, TransactionType, Category } from "@/data/mockData";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  bio: string;
  photo: string;
}

const defaultProfile: UserProfile = {
  name: "Aarav Sharma",
  email: "aarav@finvue.in",
  phone: "+91 98765 43210",
  jobTitle: "Financial Analyst",
  location: "Mumbai, Maharashtra",
  bio: "Passionate about personal finance and data-driven decisions.",
  photo: "",
};

interface Filters {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  dateFrom: string;
  dateTo: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredTransactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  isDark: boolean;
  toggleDark: () => void;
  profile: UserProfile;
  updateProfile: (p: UserProfile) => void;
}

const defaultFilters: Filters = {
  search: "",
  type: "all",
  category: "all",
  dateFrom: "",
  dateTo: "",
  sortBy: "date",
  sortOrder: "desc",
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("finvue-transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem("finvue-role") as Role) || "admin";
  });

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("finvue-profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("finvue-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("finvue-transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("finvue-role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("finvue-theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const updateProfile = useCallback((p: UserProfile) => {
    setProfile(p);
    localStorage.setItem("finvue-profile", JSON.stringify(p));
  }, []);

  const toggleDark = useCallback(() => setIsDark(prev => !prev), []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    const newT: Transaction = { ...t, id: Math.random().toString(36).substring(2, 10) };
    setTransactions(prev => [newT, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.amount.toString().includes(q)
      );
    }

    if (filters.type !== "all") {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.dateFrom) {
      result = result.filter(t => t.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter(t => t.date <= filters.dateTo);
    }

    result.sort((a, b) => {
      const mult = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return mult * (a.date.localeCompare(b.date));
      return mult * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters]);

  const totalIncome = useMemo(() => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpenses = useMemo(() => transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole, filters, setFilters,
      filteredTransactions, addTransaction, editTransaction, deleteTransaction,
      totalBalance, totalIncome, totalExpenses, isDark, toggleDark,
      profile, updateProfile,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};
