import React from "react";
import { Text } from "react-native";
import tw from "../../../tailwind";
import { getDifferentColor } from "../../utils/functions";

type Props = { text: string | JSX.Element; color: string; className?: any };

const NoteInfo = ({ text, color, className }: Props) => {
  return (
    <Text
      style={[
        tw`px-2 py-1 mr-2 mb-2 text-lg rounded-md`,
        {
          backgroundColor: getDifferentColor(color, 20),
          color: getDifferentColor(color, 185),
        },
        className,
      ]}
    >
      {text}
    </Text>
  );
};

export default NoteInfo;
