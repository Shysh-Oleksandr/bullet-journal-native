import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import NotePreview from "./NotePreview";
import { useAppDispatch } from "./../../app/hooks";
import { fetchAllNotes } from "../../features/journal/journalSlice";
import Loading from "../../shared/UI/Loading";
import tw from "../../../tailwind";

type Props = { navigation: any };

const Notes = ({ navigation }: Props) => {
  const { notes, loading } = useAppSelector((store) => store.journal);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllNotes({ user }));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={tw`pb-6`}>
      <FlatList
        contentContainerStyle={tw`px-6`}
        data={notes}
        renderItem={(item) => (
          <NotePreview
            navigation={navigation}
            note={item.item}
            previousNote={item.index === 0 ? null : notes[item.index - 1]}
          />
        )}
        keyExtractor={(item) => `${item._id}${item.isEndNote && "endNote"}`}
      />
    </View>
  );
};

export default Notes;
