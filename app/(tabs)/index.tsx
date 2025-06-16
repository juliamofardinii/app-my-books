import { StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return <Text style={styles.textWithMargin}>Oi</Text>;
}

const styles = StyleSheet.create({
  textWithMargin: {
    margin: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
