// src/components/ExpenseTracker.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useExpenses } from '@/hooks/useDB';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { StyleSheet } from 'react-native';

import { FAB } from 'react-native-paper';

const ExpenseItem = ({ item }:{item :Record<string,unknown>}) => (
  <View style={styles.expense}>
    <ThemedText>{`${item.category}`}</ThemedText>
    <ThemedText>{`$${item.amount}`}</ThemedText>
  </View>
);  

const ExpenseTracker = () => {
  const { expenses, loading, error, addExpense, reload } = useExpenses();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText style={{ fontSize: 20, marginBottom: 20 }}>Expense Tracker</ThemedText>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => addExpense({ amount: 12.99, category: 'Food', date: new Date() })}
      />
      <Button title="Reload Expenses" onPress={reload} />
      <FlatList
        data={expenses}
        scrollEnabled={false}
        keyExtractor={item => (item.id as string).toString()}
        renderItem={ExpenseItem}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
  },
  expense:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  }
});

export default ExpenseTracker;
