// src/hooks/useExpenses.js
import { useState, useEffect } from 'react';
import db from "../db/base";
import { DB_KEY } from '@/db/map';
const { init, select, insert } = db(DB_KEY.TRANSACTION);

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Record<string,unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown|null>(null);

  const loadExpenses = async () => {
    try {
      const data = await select();
      console.log(data)
      setExpenses(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (props:{amount: number, category:string, date?: Date}) => {
    try {
        let value =[props.amount, `"${props.category}"`, `"${(props.date ?? new Date()).toISOString()}"`];
      await insert(value);
      await loadExpenses(); // refresh the list after insertion
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    init()
      .then(() => loadExpenses())
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { expenses, loading, error, addExpense, reload: loadExpenses };
};
