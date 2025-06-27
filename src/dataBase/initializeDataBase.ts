import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDataBase(database: SQLiteDatabase) {
  await database.execAsync(`
  CREATE TABLE IF NOT EXISTS bookList (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookName TEXT NOT NULL,
    author TEXT NOT NULL,
    status TEXT NOT NULL
  );
`);
}
