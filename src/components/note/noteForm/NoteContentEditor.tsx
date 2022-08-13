import React, { MutableRefObject, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { logger } from "react-native-logs";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import tw from "../../../../tailwind";

const log = logger.createLogger();

interface NoteContentEditorProps {
  setContent: (value: React.SetStateAction<string>) => void;
  setImage: (value: React.SetStateAction<string>) => void;
  disabled?: boolean;
  isShort?: boolean;
  richText: React.MutableRefObject<RichEditor>;
}

const NoteContentEditor = ({
  setContent,
  setImage,
  isShort,
  disabled,
  richText,
}: NoteContentEditorProps) => {
  const [descHTML, setDescHTML] = useState<string>("");
  const [showDescError, setShowDescError] = useState<boolean>(false);

  const richTextHandle = (descriptionText: string) => {
    setContent(descriptionText);
  };

  // const submitContentHandle = () => {
  //   const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
  //   const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

  //   if (replaceWhiteSpace.length <= 0) {
  //     setShowDescError(true);
  //   } else {
  //     log.info(descHTML);
  //     log.info(replaceHTML);
  //     setContent(descHTML);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`relative`}>
        <RichToolbar
          editor={richText}
          selectedIconTint="#0e7490"
          iconTint="#070707"
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.setUnderline,
          ]}
          style={styles.richTextToolbarStyle}
        />
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          style={tw`flex-1 relative`}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.richTextContainer}>
            <RichEditor
              useContainer={true}
              ref={richText}
              disabled={disabled}
              onChange={richTextHandle}
              placeholder="Write your note here..."
              androidHardwareAccelerationDisabled={true}
              style={styles.richTextEditorStyle}
              initialHeight={250}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#CFFAFE",
    padding: 20,
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#CFFAFE",
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: "flex",
    width: "100%",
    marginVertical: 3,
  },

  richTextEditorStyle: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#CFFAFE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 22,
  },

  richTextToolbarStyle: {
    backgroundColor: "#fff",
    borderColor: "#CFFAFE",
    borderRadius: 5,
    borderWidth: 2,
    marginVertical: 3,
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },
});

export default NoteContentEditor;
