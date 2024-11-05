import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { useGlobalContext } from "@/context";
import { SingleNoteType } from "@/interfaces/context";
import { isDarkMode } from "@/lib/utils";
import { DescriptionOutlined } from "@mui/icons-material";

interface INoteContentDescriptionProps {
  singleNote: SingleNoteType;
  setSingleNote: Dispatch<SetStateAction<SingleNoteType | undefined>>;
}

function NoteContentDescription({
  singleNote,
  setSingleNote,
}: INoteContentDescriptionProps) {
  const {
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newSingleNote: SingleNoteType = {
      ...singleNote,
      description: event.target.value,
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

  return (
    <div className="flex gap-2 text-[12px] mt-8">
      <DescriptionOutlined
        sx={{ fontSize: 18 }}
        className={`mt-[9px] ${
          isHovered || isFocused ? "text-theme" : "text-slate-400"
        }`}
      />
      <textarea
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onChange={handleUpdate}
        onKeyDown={handleKeyDown}
        value={singleNote.description}
        placeholder="New Description..."
        className={`text-sm outline-none border ${
          isHovered || isFocused ? "border-theme" : ""
        } rounded-lg p-2 w-full ${
          isDarkModeEnabled ? "bg-slate-800 text-white" : "bg-white"
        }`}
      />
    </div>
  );
}

export default NoteContentDescription;
