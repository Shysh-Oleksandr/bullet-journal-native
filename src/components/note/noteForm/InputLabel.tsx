import React from "react";
import { Text, View } from "react-native";
import tw from "../../../../tailwind";

interface InputLabelProps {
  className?: any;
  text: string;
}

const InputLabel = ({ className, text }: InputLabelProps) => {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -19,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={[
          tw`text-xs z-10`,
          {
            fontSize: 13,
          },
          className,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default InputLabel;
