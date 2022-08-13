import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "../../../../tailwind";
import InputLabel from "./InputLabel";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

interface NoteDateProps {
  date: number;
  setDate: (value: React.SetStateAction<number>) => void;
  isStartDate: boolean;
  disabled?: boolean;
  inputClassname?: any;
}

const NoteDate = ({
  date,
  setDate,
  isStartDate,
  inputClassname,
  disabled,
}: NoteDateProps) => {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(date),
      onChange: (event, newDate) => setDate(newDate?.getTime() || date),
    });
  };

  return (
    <View
      style={[
        tw` flex-row items-center justify-center relative mb-5 py-2`,
        { borderBottomWidth: 2, borderColor: "#CFFAFE" },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={showDatePicker}
        style={[tw`flex-row items-center`, inputClassname]}
      >
        <Icon name="calendar-o" size={20} style={tw`mr-3`} />
        <Text style={tw`text-lg`}>
          {new Date(date).toLocaleDateString("en-CA").replaceAll("-", "/")}
        </Text>
      </TouchableOpacity>

      <InputLabel text={isStartDate ? "Start" : "End"} />
    </View>
  );
};

export default NoteDate;
