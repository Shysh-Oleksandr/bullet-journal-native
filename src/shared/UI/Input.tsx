import React from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  placeholder: string;
  multiline?: boolean;
  selectTextOnFocus?: boolean;
  className?: any;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  onChange: (text: string) => void;
};

const Input = ({
  placeholder,
  multiline,
  selectTextOnFocus,
  className,
  onChange,
  value,
  keyboardType,
}: Props) => {
  return (
    <TextInput
      keyboardType={keyboardType || "default"}
      value={value}
      selectTextOnFocus={selectTextOnFocus}
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
