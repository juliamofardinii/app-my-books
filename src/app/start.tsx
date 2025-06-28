import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Start() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text style={{ fontSize: 24 }}>Bem-vindo ao App de Livros 📚</Text>
      <Button title="Entrar" onPress={() => router.replace("/home")} />
    </View>
  );
}
