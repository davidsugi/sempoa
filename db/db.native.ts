import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabaseSync('expenses.db') as SQLite.SQLiteDatabase;
