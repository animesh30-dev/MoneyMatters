
import { Category, Transaction } from "../types";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import TransactionListItem from "./TransactionListItem";
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
          <View>
          <TouchableOpacity
            key={transactions.id}
            activeOpacity={0.7}
          >

            <TransactionListItem
              transaction={transactions}
              categoryInfo={categoryForCurrentItem}
             
            />
            
          </TouchableOpacity>
          <Pressable onPress={()=> deleteTransaction(transactions.id)}>
          <View style={{padding:6,alignSelf:'flex-end'}}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
          </View>
          </Pressable>
          </View>

        );
      })}
    </View>
  );
}
