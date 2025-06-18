import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { useProductDataBase } from "../../dataBase/useProductDataBase";

export default function Details() {
  const [data, setData] = useState({
    name: "",
    quantity: 0,
  });

  const productDataBase = useProductDataBase();
  const params = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      productDataBase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            name: response.name,
            quantity: response.quantity,
          });
        }
      });
    }
  }, [params.id]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>ID: {params.id} </Text>
      <Text style={{ fontSize: 32 }}>Quantidade: {data.quantity}</Text>
      <Text style={{ fontSize: 32 }}>Nome: {data.name}</Text>
    </View>
  );
}
