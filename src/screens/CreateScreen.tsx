import { ScrollView } from "react-native";
import tw from "../../tailwind";
import NoteForm from "../components/note/noteForm/NoteForm";

import { View } from "../components/Themed";
import Navbar from "../shared/Navbar";
import { RootTabScreenProps } from "../types";

export default function CreateScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  return (
    <View style={[tw`flex-1`, { backgroundColor: "#d4e0f1" }]}>
      <Navbar navigation={navigation} />
      <ScrollView style={tw`mt-24 flex-1 mx-4 rounded-sm bg-white`}>
        <NoteForm navigation={navigation} isShort={false} />
      </ScrollView>
    </View>
  );
}
