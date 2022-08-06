import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import tw from "../../../tailwind";

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={tw`items-center py-12`}>
      <ActivityIndicator size={52} color={"#9880ff"} />
    </View>
  );
};

export default Loading;
