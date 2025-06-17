import { useSQLiteContext } from "expo-sqlite";

export type ProductDataBase = {
  id: number;
  name: string;
  quantity: number;
};

export function useProductDataBase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ProductDataBase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO products (name, quantity) VALUES ($name, $quantity)"
    );
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $quantity: data.quantity,
      });

      const insertedRowId = result.lastInsertRowId;
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function update(data: ProductDataBase) {
    const statement = await database.prepareAsync(
      "UPDATE  products SET name = $name, quantity = $quantity WHERE id = $id"
    );
    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM products WHERE name LIKE ?"; // * para selecionar todos, ? para nomeados

      const response = await database.getAllAsync<ProductDataBase>(
        query,
        `%${name}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByName, update };
}
