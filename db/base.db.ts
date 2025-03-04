// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabaseSync('expenses.db');
// const sql =  'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, category TEXT, date TEXT);'

// const init = async ()=>{
//     return db.withTransactionAsync(async () => {
//         try{
//           await db.execAsync(sql);
//           console.log('Table created successfully');
//         }catch (e) {
//           console.error('Error creating table', e);
//         return;
//         }
//     });
// }

// const insert = async (value: any[])=>{
//         return db.withTransactionSync(async () => {
//             try{
//                await db.execAsync(
//                     `INSERT INTO expenses (amount, category, date) VALUES (${value.join(",")});`,
//                 );
            
//                 console.log('Expense added successfully');
//             }catch (e) {
//                 console.error('Error adding expense', e);
//             return false;
//             }
//         });
// }

// const select = async ()=>{
//     let data: Record<string,unknown>[] = []
//     await db.withTransactionSync(async () => {
//         try{
//             const allRows = await db.getAllAsync('SELECT * FROM expenses');
//             data=allRows as  Record<string,unknown>[];
//         }catch (e) {
//         console.error('Error fetching expense', e);
//         }
//     });
//     return data;
// }


// export default { init, insert, select }