import { Input } from "@/components/input";
import {
  ProductDataBase,
  useProductDataBase,
} from "@/dataBase/useProductDataBase";
import { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";

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

  async function list() {
    try {
      const response = await productDataBase.searchByName(search);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
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
      <Button title="Salvar" onPress={create} />
    </View>
  );
}
