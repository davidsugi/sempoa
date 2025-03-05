import { Platform } from 'react-native';
import { DB_KEY, DB_SQL } from './map';

const isWeb = Platform.OS === 'web';
export const db = isWeb ? require('./db.web').db : require('./db.native').db;

const mockExpenses = [
  { id: 1, amount: 12.99, category: 'Food', date: '2023-10-01' },
  { id: 2, amount: 25.50, category: 'Transport', date: '2023-10-02' },
  { id: 3, amount: 8.75, category: 'Entertainment', date: '2023-10-03' },
];

const sqldb = (tableKey: DB_KEY) => {
  const sql = DB_SQL[tableKey];

  const init = async () => {
    if (Platform.OS === 'web') {
      console.log('Mock init: Table created successfully');
      return Promise.resolve();
    }
    if (db) {
      return db.withTransactionAsync(async () => {
        try {
          await db.execAsync(sql);
          console.log('Table created successfully');
        } catch (e) {
          console.error('Error creating table', e);
        }
      });
    }
  };

  const insert = async (value: any[]) => {
    if (Platform.OS === 'web') {
      console.log('Mock insert: Expense added successfully');
      return Promise.resolve();
    }
    if (db) {
      return db.withTransactionSync(async () => {
        try {
          await db.runAsync(
            `INSERT INTO expenses (amount, category, date) VALUES (${value.join(",")});`,
          );
          console.log('Expense added successfully');
        } catch (e) {
          console.error('Error adding expense', e);
          return false;
        }
      });
    }
  };

  const select = async () => {
    let data: Record<string, unknown>[] = [];
    if (Platform.OS === 'web') {
      console.log('Mock select: Fetched expenses');
      return Promise.resolve(mockExpenses);
    }
    if (db) {
      return new Promise<Record<string, unknown>[]>(async (resolve, reject) => {
        db.withTransactionSync(async () => {
          try {
            const allRows = await db.getAllAsync('SELECT * FROM expenses');
            console.log(allRows);
            data = allRows as Record<string, unknown>[];
            resolve(data);
          } catch (e) {
            console.error('Error fetching expense', e);
            resolve(data);
          }
        });
      });
    }
    return data;
  };

  return { init, insert, select };
};

export default sqldb;