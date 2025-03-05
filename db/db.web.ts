// db.web.ts
// Simple in-memory mock for web
export const db =  {
    transaction: (callback: any) => callback({
      executeSql: (sql: string, params: any[], success: any, error: any) => {
        console.log(`Mock executeSql: ${sql}`);
        success && success(null, { rows: { _array: [] } });
      }
    }),
    close: () => Promise.resolve(),
    exec: () => Promise.resolve(),
    execAsync: () => Promise.resolve(),
    getAllAsync: () => Promise.resolve([]),
    runAsync: () => Promise.resolve(),
    withTransactionAsync: (callback: any) => callback(),
    withTransactionSync: (callback: any) => callback(),
  }