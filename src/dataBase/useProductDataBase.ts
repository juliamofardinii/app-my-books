import { useSQLiteContext } from "expo-sqlite";

export type ProductDataBase = {
  id: number;
  bookName: string;
  author: string;
  status: string;
};

export function useProductDataBase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ProductDataBase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO products (bookName, author, status) VALUES ($bookName, $author, $status) "
    );
    try {
      const result = await statement.executeAsync({
        $bookName: data.bookName,
        $author: data.author,
        $status: data.status,
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
      "UPDATE  products SET bookName = $bookName, auhtor =$author, stauts = $status WHERE id = $id"
    );
    try {
      await statement.executeAsync({
        $id: data.id,
        $bookName: data.bookName,
        $author: data.author,
        $status: data.status,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM products WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function searchByName(bookName: string) {
    try {
      const query = "SELECT * FROM products WHERE bookName LIKE ?"; // * para selecionar todos, ? para nomeados

      const response = await database.getAllAsync<ProductDataBase>(
        query,
        `%${bookName}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM products WHERE id = ? ";
      const response = await database.getFirstAsync<ProductDataBase>(query, [
        id,
      ]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByName, update, remove, show };
}
