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
//         return false;
//         }
//     });
// }


// export default { init }