export interface Transaction{
    id:number;
    category_id:number;
    amount:number;
    date:number;
    desciprtion:string;
    type:"Expense" | "Income";
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