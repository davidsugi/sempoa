// types.ts

// Users table
export interface User {
    id: number;
    name: string;
    email: string;
    targetCurrency: string;         // e.g., 'USD'
    annualWithdrawalRate: number;   // e.g., 0.04
    periodStartDay: number;         // e.g., 1
    periodEndDay: number;           // e.g., 30
    createdAt: Date;                // or string (ISO timestamp)
  }
  
  // Categories table

  export enum CategoryType {
    Expense,
    Income,
  }
  export interface Category {
    id: number;
    name: string;
    icon?: string;
    type: CategoryType,
    isDailySpending: boolean;
  }
  
  // Transactions table
  export interface Transaction {
    id: number;
    userId: number;         // foreign key to users.id
    categoryId: number;     // foreign key to categories.id
    amount: number;
    currency: string;       // 3-letter code, e.g., 'USD'
    rateAtTransaction: number;
    transactionDate: Date;  // or string if stored as ISO date
    description?: string;
    excludedFromDaily: boolean;
  }
  
  // Currency Rates table
  export interface CurrencyRate {
    id: number;
    baseCurrency: string;    // e.g., 'USD'
    targetCurrency: string;  // e.g., 'EUR'
    rate: number;
    updatedAt: Date;         // or string (ISO timestamp)
  }
  
  // Budgets table
  export interface Budget {
    id: number;
    userId: number;         // foreign key to users.id
    categoryId: number;     // foreign key to categories.id
    budgetAmount: number;
  }
  
  // View: periodic_balance
  export interface PeriodicBalance {
    userId: number;
    periodStartDay: number;
    periodEndDay: number;
    balanceInTargetCurrency: number;
    income: number;
    outcome: number;
  }
  
  // View: financial_freedom_status
  export interface FinancialFreedomStatus {
    userId: number;
    annualWithdrawalRate: number;
    requiredCapital: number;
  }
  