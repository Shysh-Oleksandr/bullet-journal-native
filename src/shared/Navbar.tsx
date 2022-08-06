import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import tw from "tailwind-react-native-classnames";
import Button from "./UI/Button";

type Props = {
  navigation: any;
};

const Navbar = ({ navigation }: Props) => {
  return (
    <SafeAreaView
      style={[
        tw`shadow-lg absolute top-0 left-0 right-0 flex-row items-center px-6 py-2 h-20 z-50 justify-between`,
        { backgroundColor: "#0E7490" },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={tw`w-9 h-9`}
          source={require("../../assets/images/favicon.png")}
        />
      </TouchableOpacity>
      <View style={tw`items-center flex-row`}>
        <Icon
          onPress={() => navigation.navigate("Edit")}
          style={tw`mr-5 pr-2 border-r-2 border-white`}
          name="plus"
          color={"white"}
          size={42}
        />
        <Button text="Logout" onPress={() => navigation.navigate("Login")} />
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
