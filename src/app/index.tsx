import { Input } from "@/components/input";
import { Product } from "@/components/Product";
import {
  ProductDataBase,
  useProductDataBase,
} from "@/dataBase/useProductDataBase";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, View } from "react-native";

export default function Index() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState<ProductDataBase[]>([]);
  const [search, setSearch] = useState("");

  const productDataBase = useProductDataBase();

  async function create() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert(
          "Quantidade",
          "A quantidade precisa ser um numero valido"
        );
      }
      const response = await productDataBase.create({
        name,
        quantity: Number(quantity),
      });

      Alert.alert("Produto cadastrado com o ID:  " + response.insertedRowId);
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert(
          "Quantidade",
          "A quantidade precisa ser um numero valido"
        );
      }
      const response = await productDataBase.update({
        id: Number(id),
        name,
        quantity: Number(quantity),
      });

      Alert.alert("Produto cadastrado com o ID:  " + response.insertedRowId);
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

  function details(item: ProductDataBase) {
    setId(String(item.id));
    setName(item.name);
    setQuantity(String(item.quantity));
  }

  async function handleSave() {
    if (id) {
      update();
    } else {
      create();
    }

    setId("");
    setName("");
    setQuantity("");
    await list;
  }

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 32, gap: 16 }}>
      <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input
        placeholder="Quantidade"
        onChangeText={setQuantity}
        value={quantity}
      />
      <Button title="Salvar" onPress={handleSave} />

      <Input placeholder="Pesquisar" onChangeText={setSearch} />

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product data={item} onPress={() => details(item)} />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
}
