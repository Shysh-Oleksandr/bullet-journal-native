import { Button, StyleSheet } from "react-native";
import tw from "../../tailwind";
import NoteForm from "../components/note/noteForm/NoteForm";

import { Text, View } from "../components/Themed";
import Navbar from "../shared/Navbar";
import { RootTabScreenProps } from "../types";

export default function CreateScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  return (
    <View style={tw`flex-1`}>
      <Navbar navigation={navigation} />
      <View style={tw`mt-20 flex-1`}>
        <NoteForm navigation={navigation} isShort={false} />
      </View>
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
