import { StyleSheet } from "react-native";
import Notes from "../components/note/Notes";

import { View } from "../components/Themed";
import Navbar from "../shared/Navbar";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View>
      <Navbar navigation={navigation} />
      <Notes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
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
