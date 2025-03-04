import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite?.openDatabaseSync('expenses.db');

const ExpenseTracker = () => {
  const [isDbReady, setIsDbReady] = useState(false);

  // Create table when component mounts
  useEffect(() => {
    db.withTransactionSync(async () => {
        try{
           await db.execAsync(
                'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, category TEXT, date TEXT);',
              );
        
                console.log('Table created successfully');
                setIsDbReady(true);
        }catch (e) {

        console.error('Error creating table', e);
        return false;
        }
    
    });
  }, []);

  // Function to add a sample expense
  const addExpense = () => {
    if (isDbReady) {
        db.withTransactionSync(async () => {
            try{
               await db.execAsync(
                   `INSERT INTO expenses (amount, category, date) VALUES (12.99, "Food", "${new Date().toISOString()}");`,
                  );
            
                  console.log('Expense added successfully');
            }catch (e) {
    
            console.error('Error adding expense', e);
            return false;
            }
        
        });
    } else {
      console.log('Database is not ready');
    }
  };

  // Function to fetch all expenses
  const fetchExpenses = () => {
    if (isDbReady) {
        db.withTransactionSync(async () => {
            try{
                const allRows = await db.getAllAsync('SELECT * FROM expenses');
                for (const row of allRows) {
                  console.log(row);
                } 
            }catch (e) {
            console.error('Error fetching expense', e);
            return false;
            }
        
        });
    } else {
      console.log('Database is not ready');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Expense Tracker</Text>
      <Button title="Add Expense" onPress={addExpense} />
      <Button title="Fetch Expenses" onPress={fetchExpenses} />
    </View>
  );
};

export default ExpenseTracker;
