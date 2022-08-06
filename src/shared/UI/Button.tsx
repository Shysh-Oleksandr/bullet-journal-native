import {
  View,
  Text,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "./../../../tailwind";

type Props = {
  text: string | JSX.Element;
  className?: any;
  textClassName?: any;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const Button = ({ text, onPress, className, textClassName }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[tw`shadow-lg bg-blue-500 px-3 py-1 rounded-md`, className]}
      onPress={onPress}
    >
      <Text style={[tw`text-xl text-white font-semibold`, textClassName]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
