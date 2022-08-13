import React from "react";
import { Text } from "react-native";
import tw from "../../../../tailwind";

interface InputLabelProps {
  className?: any;
  text: string;
}

const InputLabel = ({ className, text }: InputLabelProps) => {
  return (
    <Text
      style={[
        tw`text-xs z-10 block text-left absolute -bottom-4 left-1/2`,
        { transform: [{ translateX: -1 / 2 }] },
        className,
      ]}
    >
      {text}
    </Text>
  );
};

export default InputLabel;
