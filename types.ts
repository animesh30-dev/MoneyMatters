import { Image } from "react-native";

export interface Transaction {
    id: number;
    category_id: number;
    amount: number;
    date: number;
    description: string;
    type: "Expense" | "Income";
  }
export interface Category{
    id:number;
    name:string;
    type:"Expense" | "Income";
}
export interface TransactionsByMonth{
    totalExpenses:number,
    totalIncome:number,
}
export interface UserInfo {
    // Add properties based on the actual structure of your user data
    // For example:
    id?: string;
    name?: string;
    email?: string | null;
    
    // ... other properties
  }