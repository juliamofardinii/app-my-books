import { initializeDataBase } from "@/dataBase/initializeDataBase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    // para garantir que a tabela existe
    <SQLiteProvider databaseName="mydataBase.db" onInit={initializeDataBase}>
      <Slot />
    </SQLiteProvider>
  );
}
