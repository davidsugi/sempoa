// src/components/ExpenseTracker.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useExpenses } from '@/hooks/useDB';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const ExpenseTracker = () => {
  const { expenses, loading, error, addExpense, reload } = useExpenses();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <ThemedView style={{ flex: 1, padding: 16,}}>
      <ThemedText style={{ fontSize: 20, marginBottom: 20 }}>Expense Tracker</ThemedText>
      <Button
        title="Add Sample Expense"
        onPress={() => addExpense({ amount: 12.99, category: 'Food', date: new Date() })}
      />
      <Button title="Reload Expenses" onPress={reload} />
      <FlatList
        data={expenses}
        scrollEnabled={false}
        keyExtractor={item => (item.id as string).toString()}
        renderItem={({ item }) => (
          <ThemedText>{`${item.date}: ${item.category} - $${item.amount}`}</ThemedText>
        )}
      />
    </ThemedView>
  );
};

export default ExpenseTracker;
