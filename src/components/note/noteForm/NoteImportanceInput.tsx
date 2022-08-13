import React, { MutableRefObject, useRef } from "react";
import { Text, View } from "react-native";
import tw from "../../../../tailwind";
import Input from "../../../shared/UI/Input";

interface NoteImportanceInputProps {
  importance: number;
  setImportance: (value: React.SetStateAction<number>) => void;
  inputId: string;
  disabled?: boolean;
}

const NoteImportanceInput = ({
  importance,
  setImportance,
  inputId,
  disabled,
}: NoteImportanceInputProps) => {
  return (
    <View style={tw`flex-row items-center`}>
      <Input
        placeholder="1"
        keyboardType="numeric"
        selectTextOnFocus={true}
        className={[
          tw`w-12 text-xl font-medium px-2 py-1 rounded-sm`,
          { backgroundColor: "#ebf5fe", color: "#6aaac2" },
        ]}
        value={importance.toString()}
        onChange={(text) =>
          setImportance(
            Number(text) <= 10 && Number(text) >= 0 ? Number(text) : 1
          )
        }
      />
      <Text style={[tw`text-2xl px-1 py-2`, { color: "#6aaac2" }]}>/10</Text>
    </View>
  );
};

export default NoteImportanceInput;
