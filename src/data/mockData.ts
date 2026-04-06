export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Investments"
  | "Food & Dining"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Education"
  | "Travel"
  | "Rent"
  | "Subscriptions"
  | "Gifts"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export type Role = "admin" | "viewer";

const generateId = () => Math.random().toString(36).substring(2, 10);

export const CATEGORIES: Record<TransactionType, Category[]> = {
  income: ["Salary", "Freelance", "Investments", "Gifts", "Other"],
  expense: [
    "Food & Dining", "Shopping", "Transportation", "Entertainment",
    "Utilities", "Healthcare", "Education", "Travel", "Rent",
    "Subscriptions", "Other",
  ],
};

export const CATEGORY_COLORS: Record<string, string> = {
  Salary: "hsl(38, 92%, 50%)",
  Freelance: "hsl(152, 69%, 40%)",
  Investments: "hsl(217, 91%, 60%)",
  "Food & Dining": "hsl(340, 75%, 55%)",
  Shopping: "hsl(262, 83%, 58%)",
  Transportation: "hsl(173, 80%, 40%)",
  Entertainment: "hsl(28, 80%, 52%)",
  Utilities: "hsl(200, 70%, 50%)",
  Healthcare: "hsl(0, 72%, 51%)",
  Education: "hsl(270, 60%, 55%)",
  Travel: "hsl(190, 70%, 45%)",
  Rent: "hsl(45, 80%, 45%)",
  Subscriptions: "hsl(310, 60%, 50%)",
  Gifts: "hsl(130, 50%, 50%)",
  Other: "hsl(220, 15%, 55%)",
};

export const CATEGORY_ICONS: Record<string, string> = {
  Salary: "💰",
  Freelance: "💻",
  Investments: "📈",
  "Food & Dining": "🍽️",
  Shopping: "🛍️",
  Transportation: "🚗",
  Entertainment: "🎬",
  Utilities: "⚡",
  Healthcare: "🏥",
  Education: "📚",
  Travel: "✈️",
  Rent: "🏠",
  Subscriptions: "📱",
  Gifts: "🎁",
  Other: "📦",
};

export const mockTransactions: Transaction[] = [
  { id: generateId(), date: "2025-01-05", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: generateId(), date: "2025-01-07", description: "Grocery Store", amount: 85.40, type: "expense", category: "Food & Dining" },
  { id: generateId(), date: "2025-01-08", description: "Netflix Subscription", amount: 15.99, type: "expense", category: "Subscriptions" },
  { id: generateId(), date: "2025-01-10", description: "Freelance Web Project", amount: 1200, type: "income", category: "Freelance" },
  { id: generateId(), date: "2025-01-12", description: "Electric Bill", amount: 94.50, type: "expense", category: "Utilities" },
  { id: generateId(), date: "2025-01-14", description: "Online Shopping", amount: 156.80, type: "expense", category: "Shopping" },
  { id: generateId(), date: "2025-01-15", description: "Gas Station", amount: 45.00, type: "expense", category: "Transportation" },
  { id: generateId(), date: "2025-01-17", description: "Movie Tickets", amount: 32.00, type: "expense", category: "Entertainment" },
  { id: generateId(), date: "2025-01-20", description: "Dividend Income", amount: 340, type: "income", category: "Investments" },
  { id: generateId(), date: "2025-01-22", description: "Restaurant Dinner", amount: 67.90, type: "expense", category: "Food & Dining" },
  { id: generateId(), date: "2025-01-25", description: "Apartment Rent", amount: 1400, type: "expense", category: "Rent" },
  { id: generateId(), date: "2025-01-28", description: "Gym Membership", amount: 49.99, type: "expense", category: "Healthcare" },
  { id: generateId(), date: "2025-02-05", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: generateId(), date: "2025-02-06", description: "Coffee Shop", amount: 24.50, type: "expense", category: "Food & Dining" },
  { id: generateId(), date: "2025-02-08", description: "Spotify Subscription", amount: 9.99, type: "expense", category: "Subscriptions" },
  { id: generateId(), date: "2025-02-10", description: "Freelance Design Work", amount: 800, type: "income", category: "Freelance" },
  { id: generateId(), date: "2025-02-12", description: "Water Bill", amount: 42.30, type: "expense", category: "Utilities" },
  { id: generateId(), date: "2025-02-14", description: "Valentine's Gift", amount: 120, type: "expense", category: "Gifts" },
  { id: generateId(), date: "2025-02-16", description: "Uber Rides", amount: 38.50, type: "expense", category: "Transportation" },
  { id: generateId(), date: "2025-02-18", description: "Concert Tickets", amount: 95, type: "expense", category: "Entertainment" },
  { id: generateId(), date: "2025-02-20", description: "Stock Gains", amount: 520, type: "income", category: "Investments" },
  { id: generateId(), date: "2025-02-22", description: "Grocery Store", amount: 112.60, type: "expense", category: "Food & Dining" },
  { id: generateId(), date: "2025-02-25", description: "Apartment Rent", amount: 1400, type: "expense", category: "Rent" },
  { id: generateId(), date: "2025-02-27", description: "Doctor Visit", amount: 150, type: "expense", category: "Healthcare" },
  { id: generateId(), date: "2025-03-05", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: generateId(), date: "2025-03-07", description: "Lunch Delivery", amount: 35.80, type: "expense", category: "Food & Dining" },
  { id: generateId(), date: "2025-03-08", description: "Cloud Storage", amount: 2.99, type: "expense", category: "Subscriptions" },
  { id: generateId(), date: "2025-03-10", description: "Freelance Consulting", amount: 1500, type: "income", category: "Freelance" },
  { id: generateId(), date: "2025-03-12", description: "Internet Bill", amount: 59.99, type: "expense", category: "Utilities" },
  { id: generateId(), date: "2025-03-14", description: "New Shoes", amount: 89.99, type: "expense", category: "Shopping" },
  { id: generateId(), date: "2025-03-15", description: "Train Pass", amount: 75, type: "expense", category: "Transportation" },
  { id: generateId(), date: "2025-03-17", description: "Streaming Service", amount: 12.99, type: "expense", category: "Entertainment" },
  { id: generateId(), date: "2025-03-20", description: "Bond Interest", amount: 180, type: "income", category: "Investments" },
  { id: generateId(), date: "2025-03-22", description: "Supermarket", amount: 98.40, type: "expense", category: "Food & Dining" },
  { id: generateId(), date: "2025-03-25", description: "Apartment Rent", amount: 1400, type: "expense", category: "Rent" },
  { id: generateId(), date: "2025-03-28", description: "Online Course", amount: 49.99, type: "expense", category: "Education" },
  { id: generateId(), date: "2025-03-30", description: "Birthday Gift Received", amount: 200, type: "income", category: "Gifts" },
  { id: generateId(), date: "2025-04-01", description: "Weekend Trip", amount: 350, type: "expense", category: "Travel" },
  { id: generateId(), date: "2025-04-03", description: "Pharmacy", amount: 28.50, type: "expense", category: "Healthcare" },
];
