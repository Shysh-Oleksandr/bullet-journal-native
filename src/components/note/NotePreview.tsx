import { View, Text } from "react-native";
import React from "react";
import INote from "./../../interfaces/note";
import { getDifferentColor, INITIAL_NOTE_ID } from "../../utils/functions";
import tw from "../../../tailwind";
import NoteBody from "./NoteBody";

type Props = {
  note: INote;
  previousNote: INote | null;
  navigation: any;
  isLastItem: boolean;
};

const NotePreview = ({ note, previousNote, navigation, isLastItem }: Props) => {
  const isInitialNote: boolean = note._id === INITIAL_NOTE_ID;
  const isTheSameDate: boolean =
    new Date(note.startDate).toDateString() ===
    new Date(previousNote?.startDate || 1).toDateString();
  return (
    <View>
      <View>
        {!isTheSameDate ? (
          <Text style={tw`text-lg text-blue-600 tracking-wide mb-1`}>
            {new Date(note.startDate).toDateString()}
          </Text>
        ) : null}
        <NoteBody
          isLastItem={isLastItem}
          isTheSameDate={isTheSameDate}
          onPress={() => !isInitialNote && navigation.navigate("Edit")}
          note={note}
          textColor={getDifferentColor(note.color, 185)}
          showImage={true}
        />
      </View>
    </View>
  );
};

export default NotePreview;
