import React from "react";
import { TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  placeholder: string;
  multiline?: boolean;
  className?: any;
  value: string;
  onChange: (text: string) => void;
};

const Input = ({
  placeholder,
  multiline,
  className,
  onChange,
  value,
}: Props) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholderTextColor={"#999ca1"}
      style={[
        tw`px-1 py-3 text-xl font-semibold`,
        { borderColor: "#CFFAFE", borderBottomWidth: 3, letterSpacing: 0.7 },
        className,
      ]}
      multiline={multiline}
      placeholder={placeholder}
    />
  );
};

export default Input;
