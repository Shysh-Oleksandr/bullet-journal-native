import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "../../../tailwind";
import INote from "../../interfaces/note";
import { defaultNoteTypes } from "../../utils/data";
import { dateDiffInDays } from "../../utils/functions";
import NoteInfo from "./NoteInfo";
import NoteSeparator from "./NoteSeparator";

type Props = {
  textColor?: string;
  onPress: () => void;
  note: INote;
  isTheSameDate: boolean;
  showImage?: boolean;
  isLastItem: boolean;
};

const NoteBody = ({
  onPress,
  textColor,
  note,
  showImage,
  isTheSameDate,
  isLastItem,
}: Props) => {
  const noteTime =
    dateDiffInDays(new Date(note.startDate), new Date(note.endDate)) + 1;
  const { width } = useWindowDimensions();
  return (
    <View>
      {!isTheSameDate ? <NoteSeparator /> : null}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          { backgroundColor: note.color },
          tw`rounded-md flex-row items-center justify-between shadow-lg pb-2 pt-3 px-4`,
        ]}
      >
        <View style={tw`w-full`}>
          <View style={tw`w-full`}>
            <Text
              numberOfLines={1}
              style={[{ color: textColor }, tw`text-2xl font-bold`]}
            >
              {note.title}
            </Text>
            {note.content && !note.isEndNote ? (
              <RenderHtml
                contentWidth={width}
                baseStyle={{ color: textColor, fontSize: 17 }}
                source={{
                  html:
                    note.content.length > 150
                      ? note.content.slice(0, 150).concat("...")
                      : note.content,
                }}
              />
            ) : null}
          </View>
          <View
            style={tw`mt-2 text-lg flex-row items-center justify-between ${
              noteTime >= 2 ? "pr-16" : ""
            }`}
          >
            <View style={tw`flex-row items-center flex-wrap`}>
              {note.isStarred ? (
                <NoteInfo
                  text={<Icon name="star" size={20} />}
                  color={note.color}
                />
              ) : null}
              <NoteInfo
                text={`${note.rating}/10`}
                color={note.color}
                className="tracking-widest"
              />
              <NoteInfo
                text={
                  note.type
                    ? note.type.labelName
                    : defaultNoteTypes[0].labelName
                }
                color={note.color}
              />
              {note.category?.map((category) => {
                if (!category) return null;
                return (
                  <NoteInfo
                    text={category.labelName}
                    key={category._id}
                    color={note.color}
                  />
                );
              })}
            </View>
          </View>
          {noteTime >= 2 ? (
            <View style={tw`absolute bottom-0 right-0 z-10`}>
              <NoteInfo
                text={`${noteTime} days`}
                color={note.color}
                className={tw`${note.isEndNote ? "font-bold" : ""}`}
              />
            </View>
          ) : null}
          {note.isEndNote ? (
            <View style={tw`absolute top-0 right-0 z-10`}>
              <NoteInfo
                text="Ended"
                color={note.color}
                className={tw`font-bold`}
              />
            </View>
          ) : null}
        </View>
        {note.image && showImage && note.isEndNote ? (
          <Image source={{ uri: note.image }} />
        ) : null}
      </TouchableOpacity>
      {!isLastItem ? <NoteSeparator /> : null}
    </View>
  );
};

export default NoteBody;
