import React, { useEffect, useState } from "react";
import { Animated, FlatList, View } from "react-native";
import tw from "../../../tailwind";
import { useAppSelector } from "../../app/hooks";
import { fetchAllNotes } from "../../features/journal/journalSlice";
import Loading from "../../shared/UI/Loading";
import { useAppDispatch } from "./../../app/hooks";
import NotePreview from "./NotePreview";

type Props = { navigation: any; scrollY: Animated.Value };

const Notes = ({ navigation, scrollY }: Props) => {
  const { notes, loading } = useAppSelector((store) => store.journal);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [itemsToShow, setItemsToShow] = useState<number>(10);
  const itemOffset = 5;

  useEffect(() => {
    dispatch(fetchAllNotes({ user }));
  }, []);

  const showMoreItems = () => {
    setItemsToShow((prev) => prev + itemOffset);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={tw`flex-1`}>
      <FlatList
        contentContainerStyle={tw`px-6`}
        data={notes.slice(0, itemsToShow)}
        onEndReachedThreshold={0.2}
        onEndReached={showMoreItems}
        ListFooterComponent={() => <View style={tw`py-3`} />}
        ListHeaderComponent={() => <View style={tw`py-12`} />}
        renderItem={(item) => (
          <NotePreview
            navigation={navigation}
            note={item.item}
            isLastItem={item.index === notes.length - 1}
            previousNote={item.index === 0 ? null : notes[item.index - 1]}
          />
        )}
        keyExtractor={(item) => `${item._id}${item.isEndNote ? "endNote" : ""}`}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      />
    </View>
  );
};

export default Notes;
