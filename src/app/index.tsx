import { Input } from "@/components/input";
import { Product } from "@/components/Product";
import {
  ProductDataBase,
  useProductDataBase,
} from "@/dataBase/useProductDataBase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [products, setProducts] = useState<ProductDataBase[]>([]);
  const [search, setSearch] = useState("");

  const productDataBase = useProductDataBase();

  async function create() {
    try {
      const response = await productDataBase.create({
        bookName,
        author,
        status,
      });

      Alert.alert("Produto cadastrado com o ID:  " + response.insertedRowId);
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    try {
      const response = await productDataBase.update({
        id: Number(id),
        bookName,
        author,
        status,
      });

      Alert.alert("Livro atualizado!");
    } catch (error) {
      console.log(error);
    }
  }

  async function list() {
    try {
      const response = await productDataBase.searchByName(search);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(id: number) {
    try {
      await productDataBase.remove(id);
      await list();
    } catch (error) {
      console.log(error);
    }
  }

  function details(item: ProductDataBase) {
    setId(String(item.id));
    setBookName(item.bookName);
    setAuthor(item.author);
    setStatus(item.status);
  }

  async function handleSave() {
    if (id) {
      update();
    } else {
      create();
    }

    setId("");
    setBookName("");
    setAuthor("");
    setStatus("");
    await list();
  }

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 32, gap: 16 }}>
      <Input
        placeholder="Nome do livro"
        onChangeText={setBookName}
        value={bookName}
      />
      <Input placeholder="Autor" onChangeText={setAuthor} value={author} />
      <Input placeholder="Status" onChangeText={setStatus} value={status} />
      <Button title="Salvar" onPress={handleSave} />

      <Input placeholder="Pesquisar" onChangeText={setSearch} />

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            data={item}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onOpen={() =>
              router.push({
                pathname: "/details/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
}
