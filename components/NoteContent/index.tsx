import { useGlobalContext } from "@/context";
import { SingleNoteType } from "@/interfaces/context";
import { useCallback, useEffect, useState } from "react";
import { debounce, isDarkMode } from "@/lib/utils";
import toast from "react-hot-toast";
import NoteContentHeader from "./NoteContentHeader";
import NoteContentTags from "./NoteContentTags";
import NoteContentDescription from "./NoteContentDescription";
import NoteContentCodeBlock from "./NoteContentCodeBlock";

function NoteContent() {
  const {
    openNoteContentObject: { openNoteContent, setOpenNoteContent },
    isMobileObject: { isMobile },
    selectedNoteObject: { selectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
    clerkUserIdObject: { clerkUserId },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const [singleNote, setSingleNote] = useState<SingleNoteType | undefined>(
    undefined
  );

  useEffect(() => {
    if (openNoteContent && selectedNote) {
      setSingleNote((_) => selectedNote);
    }
  }, [openNoteContent, selectedNote]);

  useEffect(() => {
    if (isNewNote && singleNote && !!singleNote.title) {
      // add note in DB
      saveNoteInDB();

      setAllNotes((_) => [singleNote, ...allNotes]);
      setIsNewNote((_) => false);
    } else if (!isNewNote && singleNote && !!singleNote.title) {
      debouncedUpdateNoteInDB(singleNote, clerkUserId);
    }
  }, [singleNote]);

  const saveNoteInDB = async () => {
    try {
      const response = await fetch(`/api/snippets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...singleNote, clerkUserId }),
      });

      if (!response.ok) {
        toast.error("Error: Something went wrong");
      } else {
        const data = await response.json();
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error("Error: ", error?.message || error);
    }
  };

  const updateNoteInDB = async (note: SingleNoteType, userId: string) => {
    try {
      const response = await fetch(`/api/snippets?id=${note?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...note, userId }),
      });

      if (!response.ok) {
        toast.error("Error: Something went wrong");
      }
    } catch (error: any) {
      toast.error("Error: ", error?.message || error);
    }
  };

  const debouncedUpdateNoteInDB = useCallback(
    debounce((note: SingleNoteType, userId: string) => {
      updateNoteInDB(note, userId);
    }, 500),
    []
  );

  return (
    <div
      className={`mt-4 border ${
        isMobile ? "w-4/5" : "w-1/2"
      } shadow-2xl p-3 rounded-lg ${
        openNoteContent ? "block" : "hidden"
      } h-[700px]
      ${
        isMobile
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          : ""
      }
      ${isDarkModeEnabled ? "bg-slate-800" : "bg-white"}    
      `}
    >
      {singleNote && (
        <>
          <NoteContentHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <NoteContentTags
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <NoteContentDescription
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <NoteContentCodeBlock
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
        </>
      )}
    </div>
  );
}

export default NoteContent;
