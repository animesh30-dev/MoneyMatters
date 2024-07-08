import { SetStateAction } from "react";
import { Category, Transaction } from "../types";
import { TouchableOpacity, View, Text } from "react-native";
import TransactionListItem from "./TransactionListItem";

export default function TransactionList({
  transactions,
  categories,
  deleteTransaction,
}: {
  categories: Category[];
  transactions: Transaction[];
  deleteTransaction: (id: number) => Promise<void>;
}) {
  return (

    <View style={{gap:15}}>
      {transactions.map((transactions) => {
        const categoryForCurrentItem = categories.find(
          (category) => category.id === transactions.category_id
        );
        return (
          <TouchableOpacity
            key={transactions.id}
            activeOpacity={0.7}
            onLongPress={() => deleteTransaction(transactions.id)}
          >
            <TransactionListItem
              transaction={transactions}
              categoryInfo={categoryForCurrentItem}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
