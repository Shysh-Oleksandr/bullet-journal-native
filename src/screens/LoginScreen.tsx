import { Text } from "react-native";

import { View } from "../components/Themed";
import Navbar from "../shared/Navbar";
import { RootTabScreenProps } from "../types";

export default function LoginScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View>
      <Navbar navigation={navigation} />
      <Text>Login</Text>
    </View>
  );
}
