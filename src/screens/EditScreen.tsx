import { Button, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Navbar from "../shared/Navbar";
import { RootTabScreenProps } from "../types";

export default function EditScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  return (
    <View>
      <Navbar navigation={navigation} />
      <Text style={styles.title}>Add note</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
