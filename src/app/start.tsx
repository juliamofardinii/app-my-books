import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Start() {
  const router = useRouter();

  return (
    <View>
      <Text className="text-2xl">Bem-vindo ao App de Livros 📚</Text>
      <Button title="Entrar" onPress={() => router.replace("/home")} />
      <Text className="mt-10 text-slate-950">Lala</Text>
    </View>
  );
}
