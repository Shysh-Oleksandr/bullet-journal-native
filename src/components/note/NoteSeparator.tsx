import { View, Text } from "react-native";
import React from "react";
import tw from "../../../tailwind";

type Props = {};

const NoteSeparator = (props: Props) => {
  return <View style={tw`h-6 w-1 bg-gray-300 rounded-lg ml-12`} />;
};

export default NoteSeparator;
