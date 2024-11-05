import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  KeyboardEvent,
  useState,
} from "react";
import { useGlobalContext } from "@/context";
import { SingleNoteType } from "@/interfaces/context";
import { Close, TitleOutlined } from "@mui/icons-material";
import { isDarkMode } from "@/lib/utils";

interface NoteContentHeaderProps {
  singleNote: SingleNoteType;
  setSingleNote: Dispatch<SetStateAction<SingleNoteType | undefined>>;
}

function NoteContentHeader({
  singleNote,
  setSingleNote,
}: NoteContentHeaderProps) {
  const {
    allNotesObject: { allNotes, setAllNotes },
    openNoteContentObject: { openNoteContent, setOpenNoteContent },
    isNewNoteObject: { isNewNote, setIsNewNote },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newSingleNote: SingleNoteType = {
      ...singleNote,
      title: event.target.value,
    };
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      if (note.id === newSingleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes((_) => newAllNotes);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Event") {
      event.preventDefault();
    }
  };

  const handleClose = () => {
    setIsNewNote(false);
    setOpenNoteContent(false);
  };

  return (
    <div className="flex justify-between gap-8 mb-4">
      <div className="flex gap-2 w-full">
        <TitleOutlined
          sx={{ fontSize: 19 }}
          className={`${isFocused ? "text-theme" : "text-slate-400"} mt-[4px]`}
        />
        <textarea
          ref={textAreaRef}
          placeholder="New Title..."
          value={singleNote.title}
          onChange={handleUpdate}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onMouseEnter={() => setIsFocused(false)}
          onMouseLeave={() => setIsFocused(true)}
          className={`font-bold text-xl outline-none resize-none h-[30px] overflow-hidden w-full px-2 rounded bg-transparent ${
            isDarkModeEnabled ? "caret-white text-white" : ""
          }`}
        />
      </div>
      <Close
        onClick={handleClose}
        className="text-slate-400 text-3xl cursor-pointer"
        sx={{ cursor: "pointer", fontSize: 18 }}
      />
    </div>
  );
}

export default NoteContentHeader;
