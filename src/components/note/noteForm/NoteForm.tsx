import axios from "axios";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";

import Icon from "react-native-vector-icons/OcticonsIcon";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import TextareaAutosize from "react-textarea-autosize";
import tw from "tailwind-react-native-classnames";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import config from "../../../config/config";
import logging from "../../../config/logging";
import {
  fetchAllNotes,
  setError,
  setSuccess,
} from "../../../features/journal/journalSlice";
import useDebounce from "../../../hooks/useDebounce";
import ICustomLabel from "../../../interfaces/customLabel";
import INote from "../../../interfaces/note";
import Input from "../../../shared/UI/Input";
import Loading from "../../../shared/UI/Loading";
import { defaultNoteTypes } from "../../../utils/data";
import { getContentWords, INITIAL_NOTE_ID } from "../../../utils/functions";
import InputLabel from "./InputLabel";
import NoteCategoryInput from "./NoteCategoryInput";
import NoteContentEditor from "./NoteContentEditor";
import NoteDate from "./NoteDate";
import NoteFormPreview from "./NoteFormPreview";
import NoteImportanceInput from "./NoteImportanceInput";
import NoteSavingIndicator from "./NoteSavingIndicator";
import NoteTypeInput from "./NoteTypeInput";
import OtherNotes from "./OtherNotes";
import SaveButton from "./SaveButton";

interface NoteFormProps {
  noteID?: string;
  isShort?: boolean;
  navigation: any;
  showFullAddForm?: boolean;
  setShowFullAddForm?: (value: React.SetStateAction<boolean>) => void;
}

const NoteForm = ({
  isShort,
  showFullAddForm,
  setShowFullAddForm,
  navigation,
  noteID,
}: NoteFormProps) => {
  const [_id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<number>(new Date().getTime());
  const [endDate, setEndDate] = useState<number>(new Date().getTime());
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [color, setColor] = useState<string>("#04a9c6");
  const [rating, setRating] = useState<number>(1);
  const [type, setType] = useState<ICustomLabel>(defaultNoteTypes[0]);
  const [category, setCategory] = useState<ICustomLabel[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [prevNote, setPrevNote] = useState<INote | null>(null);
  const [nextNote, setNextNote] = useState<INote | null>(null);

  const richText = useRef() as MutableRefObject<RichEditor>;

  const debouncedDelay = 2000;

  const debouncedTitle = useDebounce(title, debouncedDelay);
  const debouncedStartDate = useDebounce(startDate, debouncedDelay);
  const debouncedEndDate = useDebounce(endDate, debouncedDelay);
  const debouncedContent = useDebounce(content, debouncedDelay);
  const debouncedColor = useDebounce(color, debouncedDelay);
  const debouncedRating = useDebounce(rating, debouncedDelay);
  const debouncedType = useDebounce(type, debouncedDelay);
  const debouncedCategory = useDebounce(category, debouncedDelay);
  const debouncedIsLocked = useDebounce(isLocked, debouncedDelay);
  const debouncedIsStarred = useDebounce(isStarred, debouncedDelay);

  const [modal, setModal] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [words, setWords] = useState(0);

  const { user } = useAppSelector((store) => store.user);
  const { notes, isSidebarShown } = useAppSelector((store) => store.journal);

  const dispatch = useAppDispatch();

  const resetState = () => {
    setId("");
    setTitle("");
    setStartDate(new Date().getTime());
    setEndDate(new Date().getTime());
    setContent("");
    setImage("");
    setColor("#04a9c6");
    setRating(1);
    setType(defaultNoteTypes[0]);
    setCategory([]);
    setIsLocked(false);
    setIsStarred(false);
  };

  // useEffect(() => {
  //   if (noteID) {
  //     // If it's edit page, get note by id.
  //     setId(noteID);
  //     getNote(noteID);
  //   }
  //   // Otherwise, have the blank form.
  //   else {
  //     resetState();
  //     setIsLoading(false);
  //   }
  // }, [location]);

  // useEffect(() => {
  //   if (isShort) return;
  //   const filteredNotes = notes.filter((note) => !note.isEndNote);
  //   const currNoteIndex = filteredNotes.map((note) => note._id).indexOf(_id);
  //   if (currNoteIndex !== -1) {
  //     const _prevNote: INote | null =
  //       currNoteIndex - 1 >= 0 ? filteredNotes[currNoteIndex - 1] : null;
  //     const _nextNote: INote | null =
  //       currNoteIndex + 1 < filteredNotes.length
  //         ? filteredNotes[currNoteIndex + 1]
  //         : null;
  //     setPrevNote(_prevNote?._id === INITIAL_NOTE_ID ? null : _prevNote);
  //     setNextNote(_nextNote?._id === INITIAL_NOTE_ID ? null : _nextNote);
  //   }
  // }, [notes, _id]);

  // useEffect(() => {
  //   setWords(
  //     content.trim() == "<p></p>" || content === ""
  //       ? 0
  //       : getContentWords(content)
  //   );
  // }, [content]);

  const getNote = async (id: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.server.url}/notes/read/${id}`,
      });

      if (response.status === 200 || response.status === 304) {
        if (user._id !== response.data.note.author) {
          logging.warn("This note is owned by someone else");
          setId("");
        } else {
          let note = response.data.note as INote;

          setTitle(note.title);
          setStartDate(note.startDate);
          setEndDate(note.endDate);
          setContent(note.content || "");
          setImage(note.image || "");
          setColor(note.color);
          setRating(note.rating);
          setType(note.type || defaultNoteTypes[0]);
          setCategory(note.category || []);
          setIsLocked(note.isLocked || false);
          setIsStarred(note.isStarred || false);

          // const contentBlock = htmlToDraft(note.content || "");
          // const contentState = ContentState.createFromBlockArray(
          //   contentBlock.contentBlocks
          // );
          // const _editorState = EditorState.createWithContent(contentState);

          // setEditorState(_editorState);
        }
      } else {
        dispatch(setError("Unable to retrieve note " + id));
        setId("");
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async (
    method: string,
    url: string,
    isCreating: boolean,
    showMessage: boolean = true
  ) => {
    const _startDate = new Date(startDate);

    const _endDate = new Date(endDate);
    _startDate.setHours(0, 0, 0, 0);
    _endDate.setHours(0, 0, 0, 0);
    if (title === "" || color === "" || !startDate || !endDate) {
      showMessage && dispatch(setError("Please fill out all required fields."));
      showMessage && dispatch(setSuccess(""));
      return null;
    } else if (_startDate.getTime() > _endDate.getTime()) {
      showMessage &&
        dispatch(setError("End date cannot be earlier than start date."));
      return null;
    }

    showMessage && dispatch(setError(""));
    showMessage && dispatch(setSuccess(""));
    setSaving(true);

    try {
      const response = await axios({
        method: method,
        url: url,
        data: {
          title,
          startDate,
          endDate,
          image,
          color,
          rating: rating > 0 && rating <= 10 ? rating : 1,
          content,
          type,
          category,
          isLocked,
          isStarred,
          author: user._id,
        },
      });

      if (response.status === 201) {
        if (isShort) {
          dispatch(fetchAllNotes({ user }));
          resetState();
        } else {
          const newNoteId = response.data.note._id;
          setId(newNoteId);
          _id === "" && navigation.navigate("Edit", { noteID: newNoteId });
        }
        showMessage &&
          dispatch(setSuccess(`Note ${isCreating ? "added" : "updated"}.`));
      } else {
        showMessage && dispatch(setError("Unable to save note."));
      }
    } catch (error: any) {
      showMessage && dispatch(setError(error.message));
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 500);
    }
  };

  const createNote = async () =>
    await saveNote("POST", `${config.server.url}/notes/create`, true);
  const editNote = async (showMessage: boolean = true) =>
    await saveNote(
      "PATCH",
      `${config.server.url}/notes/update/${_id}`,
      false,
      showMessage
    );

  const deleteNote = async () => {
    setDeleting(true);
    try {
      const response = await axios({
        method: "DELETE",
        url: `${config.server.url}/notes/${_id}`,
      });

      if (response.status === 200) {
        setTimeout(() => {
          navigation.navigate("Home");
          dispatch(setSuccess("Note has been deleted."));
          setDeleting(false);
        }, 500);
      } else {
        dispatch(setError("Unable to delete note."));
        setDeleting(false);
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      setDeleting(false);
    }
  };

  const handleStarredClick = () => {
    if (isLocked) return;
    setIsStarred(!isStarred);
    dispatch(
      setSuccess(
        `Note was ${isStarred ? "removed from" : "added to"} the star list.`
      )
    );
  };

  const handleLockedClick = () => {
    setIsLocked(!isLocked);
    dispatch(setSuccess(`Note was ${isLocked ? "unlocked" : "locked"}.`));
  };

  // useEffect(() => {
  //   if (isShort) return;
  //   _id !== "" && editNote(false);
  // }, [
  //   debouncedTitle,
  //   debouncedStartDate,
  //   debouncedEndDate,
  //   debouncedContent,
  //   debouncedColor,
  //   debouncedRating,
  //   debouncedType,
  //   debouncedCategory,
  //   debouncedIsLocked,
  //   debouncedIsStarred,
  // ]);

  // if (isLoading) {
  //   return (
  //     <div className={`${isShort ? "" : `pb-8`}`}>
  //       <Loading />
  //     </div>
  //   );
  // }

  if (true) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={tw`mx-4 flex-1`}
        onPress={() =>
          richText.current?.isKeyboardOpen &&
          richText.current?.dismissKeyboard()
        }
      >
        <Input
          value={title}
          placeholder="Title"
          onChange={(text) => setTitle(text)}
        />
        <View style={tw`flex-row items-center justify-between`}>
          <NoteDate
            date={startDate}
            isStartDate={true}
            setDate={setStartDate}
          />
          <OcticonsIcon name="dash" size={35} />
          <NoteDate date={endDate} isStartDate={false} setDate={setEndDate} />
        </View>
        <NoteContentEditor
          richText={richText}
          setContent={setContent}
          setImage={setImage}
          isShort={isShort}
          disabled={false}
        />
        <SaveButton text="Save" disabled={false} onPress={() => 3} />
      </TouchableOpacity>
    );
  }

  // return (
  //   <div
  //     className={` ${isShort ? "" : `pb-8`} ${
  //       isShort && !showFullAddForm
  //         ? "max-h-16 overflow-hidden mb-4"
  //         : "max-h-[300rem]"
  //     }`}
  //   >
  //     <form
  //       onClick={() => setShowFullAddForm && setShowFullAddForm(true)}
  //       className={`bg-white rounded-sm shadow-xl ${
  //         isShort
  //           ? "pb-4 pt-2 px-8"
  //           : "md:pt-3 sm:pt-2 pt-[6px] md:pb-6 sm:pb-4 pb-3 md:mt-12 sm:mt-8 mt-6 xlg:px-10 lg:px-4 md:px-10 sm:px-6 px-4"
  //       }`}
  //     >
  //       <div className="fl border-bottom relative z-10">
  //         {!isShort && _id !== "" && (
  //           <div className="fl text-gray-400 text-3xl mr-3">
  //             <span
  //               onClick={handleStarredClick}
  //               className={`cursor-pointer transition-colors hover:text-cyan-600 mr-1 ${
  //                 isStarred ? "text-cyan-500" : ""
  //               }`}
  //             >
  //               <Icon name="star" />
  //             </span>
  //             <span
  //               onClick={handleLockedClick}
  //               className={`cursor-pointer transition-colors hover:text-gray-600 ${
  //                 isLocked ? "text-gray-700" : ""
  //               }`}
  //             >
  //               {isLocked ? <Icon name="lock" /> : <Icon name="unlock-alt" />}
  //             </span>
  //           </div>
  //         )}
  //         <TextareaAutosize
  //           spellCheck={false}
  //           maxRows={5}
  //           disabled={saving || isLocked}
  //           placeholder="Title"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //           className={`font-medium w-full flex-1 sm:pr-20 pr-12 text-cyan-900 resize-none overflow-hidden ${
  //             isShort
  //               ? "py-2 text-2xl"
  //               : "md:py-4 sm:py-3 py-[6px] md:text-3xl sm:text-2xl text-xl"
  //           }`}
  //           required={true}
  //         />
  //         {!isShort && _id !== "" && <NoteSavingIndicator saving={saving} />}
  //       </div>
  //       <div className="fl lg:flex-row flex-col border-bottom-lg-show mb-6">
  //         <div className="fl xs:h-11 border-bottom-lg lg:w-auto w-full lg:justify-start xs:justify-between justify-center xs:flex-row flex-col lg:border-r-2 xlg:pr-4">
  //           <NoteDate
  //             disabled={saving || isLocked}
  //             date={startDate}
  //             isStartDate={true}
  //             setDate={setStartDate}
  //             inputClassname="border-bottom-xs w-full fl justify-center"
  //           />
  //           <OcticonsIcon name="dash" />
  //           <NoteDate
  //             disabled={saving || isLocked}
  //             date={endDate}
  //             isStartDate={false}
  //             setDate={setEndDate}
  //             inputClassname="xs:mt-0 mt-3"
  //           />
  //         </div>
  //         <div className="fl border-bottom-lg lg:mt-0 mt-5 w-full justify-between lg:px-0 xs:px-4">
  //           <div className="xlg:mx-4 lg:mx-1 sm:ml-2 mr-4 flex-shrink-0 text-lg text-cyan-600 whitespace-nowrap">
  //             {words} words
  //           </div>
  //           <div className="fl custom-border lg:border-l-2 xlg:pl-8 lg:pl-1">
  //             <div className="relative fl xlg:mr-3 mr-1 h-11">
  //               <NoteImportanceInput
  //                 disabled={saving || isLocked}
  //                 importance={rating}
  //                 setImportance={setRating}
  //                 inputId="noteRatingInput"
  //               />
  //               <label
  //                 htmlFor="noteRatingInput"
  //                 className="cursor-pointer text-3xl px-1 text-[#6aaac2] py-2"
  //               >
  //                 /10
  //               </label>
  //               <InputLabel text="Importance" />
  //             </div>
  //             <div className="relative fl h-11">
  //               <label
  //                 style={{ color: color }}
  //                 htmlFor="noteColorInput"
  //                 className="cursor-pointer text-3xl xlg:px-4 lg:px-1 px-3 text-[#6aaac2] py-2"
  //               >
  //                 <IoniconsIcon name="ios-color-palette-sharp" />
  //               </label>
  //               <input
  //                 type="color"
  //                 id="noteColorInput"
  //                 className="hidden"
  //                 disabled={saving || isLocked}
  //                 value={color}
  //                 onChange={(e) => {
  //                   setColor(e.target.value);
  //                 }}
  //               />
  //               <InputLabel text="Color" />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex-between border-bottom my-3">
  //         <div className="relative sm:mr-4 mr-2 sm:basis-auto basis-1/2">
  //           <NoteTypeInput
  //             disabled={saving || isLocked}
  //             setNoteColor={setColor}
  //             label={type}
  //             setLabel={setType}
  //           />
  //           <InputLabel text="Type" />
  //         </div>
  //         <div className="relative sm:basis-3/4 basis-1/2">
  //           <NoteCategoryInput
  //             disabled={saving || isLocked}
  //             setNoteColor={setColor}
  //             label={category}
  //             setLabel={setCategory}
  //           />
  //           <InputLabel text="Categories" />
  //         </div>
  //       </div>
  //       <NoteContentEditor
  //         disabled={isLocked}
  //         setEditorState={setEditorState}
  //         setContent={setContent}
  //         setImage={setImage}
  //         editorState={editorState}
  //         isShort={isShort}
  //       />
  //       <div>
  //         <SaveButton
  //           className={`bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900 ${
  //             isShort ? "mt-2 py-2" : "mt-4"
  //           }`}
  //           onclick={(e) => {
  //             e.preventDefault();
  //             _id !== "" ? editNote() : createNote();
  //           }}
  //           disabled={saving || isLocked}
  //           type="submit"
  //           icon={<IoniconsIcon name="save-sharp" />}
  //           text={_id !== "" ? "Update" : "Create"}
  //         />
  //         {_id !== "" && (
  //           <SaveButton
  //             className="bg-red-600 hover:bg-red-700 mt-2 disabled:bg-red-900"
  //             onclick={() => setModal(true)}
  //             disabled={saving || isLocked}
  //             type="button"
  //             icon={<MaterialCommunityIcon name="delete" />}
  //             text="Delete"
  //           />
  //         )}
  //       </div>
  //       {!isShort && _id && (prevNote || nextNote) && (
  //         <OtherNotes prevNote={prevNote} nextNote={nextNote} />
  //       )}
  //     </form>
  //     <NoteFormPreview
  //       isShort={isShort}
  //       startDate={startDate}
  //       note={{
  //         _id,
  //         title,
  //         startDate,
  //         endDate,
  //         content,
  //         image,
  //         color,
  //         rating,
  //         category,
  //         type,
  //         isStarred,
  //         author: "",
  //       }}
  //     />
  //     {/* {_id !== "" && modal && (
  //       <DeleteModal
  //         deleteNote={deleteNote}
  //         deleting={deleting}
  //         modal={modal}
  //         setModal={setModal}
  //       />
  //     )} */}
  //   </div>
  // );
};

export default NoteForm;
