import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import tw from "../../tailwind";
import Notes from "../components/note/Notes";

import { View } from "../components/Themed";
import Navbar from "../shared/Navbar";
import Button from "../shared/UI/Button";
import { RootTabScreenProps } from "../types";
import Icon from "react-native-vector-icons/Feather";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 80);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
  });

  return (
    <View style={tw`flex-1 bg-blue-50`}>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          elevation: 4,
          zIndex: 100,
        }}
      >
        <Navbar navigation={navigation} />
      </Animated.View>
      <Notes navigation={navigation} scrollY={scrollY} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Edit")}
        style={tw`absolute bottom-4 right-3 bg-blue-500 rounded-full h-16 w-16 p-0 flex-1 justify-center items-center`}
      >
        <Icon name="plus" color={"white"} size={46} />
      </TouchableOpacity>
    </View>
  );
}
