import { Button, StyleSheet } from "react-native";
import NoteForm from "../components/note/noteForm/NoteForm";

import { Text, View } from "../components/Themed";
import Navbar from "../shared/Navbar";
import { RootTabScreenProps } from "../types";

interface Props {
  navigation: any;
  noteID: string;
}

export default function EditScreen({ navigation, noteID }: Props) {
  return (
    <View>
      <Navbar navigation={navigation} />
      <NoteForm noteID={noteID} navigation={navigation} isShort={false} />
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
