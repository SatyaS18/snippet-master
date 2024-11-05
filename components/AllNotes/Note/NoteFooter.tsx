import { useState } from "react";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";
import { useGlobalContext } from "@/context";
import { SingleLanguageType } from "@/interfaces/context";
import { getSelectedSidebarItem } from "@/lib/utils";
import {
  DeleteRounded,
  Replay,
  RestoreFromTrashOutlined,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import DeletionConfirmationPopup from "./DeletionConfirmationPopup";

interface NoteFooterProps {
  id: string;
  language: string;
}

function NoteFooter({ id, language }: NoteFooterProps) {
  const {
    allNotesObject: { allNotes, setAllNotes },
    sidebarMenuObject: { sidebarMenu },
    clerkUserIdObject: { clerkUserId },
    openNoteContentObject: { openNoteContent },
    isMobileObject: { isMobile },
  } = useGlobalContext();

  const [showDeletionConfirmationPopup, setShowDeletionConfirmationPopup] =
    useState<boolean>(false);

  const isTrashItem =
    getSelectedSidebarItem(sidebarMenu).trim().toLowerCase() === "trash";

  const currentLanguage: SingleLanguageType =
    AVAILABLE_LANGUAGES.find(
      (lang) => lang.name.trim().toLowerCase() === language.trim().toLowerCase()
    ) || AVAILABLE_LANGUAGES[0];

  const handleNoteDelete = (shouldDelete: boolean = true) => {
    const newAllNotes = allNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          isDeleted: shouldDelete,
        };
      }
      return note;
    });
    if (isTrashItem) {
      permanentlyDeleteNoteInDB();
      setAllNotes((_) => newAllNotes.filter((note) => note.id !== id));
    } else {
      deleteNoteInDB(shouldDelete);
    }
    setAllNotes((_) => newAllNotes);

    if (shouldDelete && !isTrashItem) {
      toast((t) => (
        <div className="flex gap-2 items-center">
          <span>Note has been moved to trash</span>
          <button
            className="bg-theme p-[4px] px-3 text-sm text-white rounded-md flex gap-1 items-center"
            onClick={() => {
              toast.dismiss(t.id);
              handleNoteDelete(false);
            }}
          >
            <Replay sx={{ fontSize: 17 }} />
            <span>Undo</span>
          </button>
        </div>
      ));
    }
  };

  const permanentlyDeleteNoteInDB = async () => {
    try {
      const currentNote = allNotes.find((note) => note.id === id);
      const response = await fetch(`/api/snippets?id=${currentNote?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        toast.error("Error: Something went wrong");
      } else {
        const data = await response.json();
        toast.success(data.message);
        setShowDeletionConfirmationPopup(false);
      }
    } catch (error: any) {
      toast.error("Error: ", error?.message || error);
    }
  };

  const deleteNoteInDB = async (shouldDelete: boolean) => {
    try {
      const currentNote = allNotes.find((note) => note.id === id);
      const response = await fetch(`/api/snippets?id=${currentNote?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentNote,
          clerkUserId,
          isDeleted: shouldDelete,
        }),
      });

      if (!response.ok) {
        toast.error("Error: Something went wrong");
      }
    } catch (error: any) {
      toast.error("Error: ", error?.message || error);
    }
  };

  return (
    <div
      className={`absolute bottom-2 flex justify-between text-[13px] text-slate-400 mx-4 mt-3 ${
        openNoteContent ? "w-[95%]" : isMobile ? `w-[92%]` : `w-[360px]`
      }`}
    >
      <div className="flex gap-1 items-center">
        {currentLanguage.icon}
        <span className="capitalize">{currentLanguage.name}</span>
      </div>
      <div className="flex gap-2 items-center">
        {isTrashItem && (
          <RestoreFromTrashOutlined
            onClick={() => {
              handleNoteDelete(false);
            }}
            sx={{ fontSize: 18 }}
            className="cursor-pointer text-theme"
          />
        )}
        <DeleteRounded
          onClick={() => {
            setShowDeletionConfirmationPopup(true);
          }}
          sx={{ fontSize: 17 }}
          className={`${
            isTrashItem ? "text-theme" : ""
          } cursor-pointer hover:text-theme`}
        />
      </div>
      {showDeletionConfirmationPopup && (
        <DeletionConfirmationPopup
          handleAction={() => handleNoteDelete(true)}
          handleClose={() => setShowDeletionConfirmationPopup(false)}
        />
      )}
    </div>
  );
}

export default NoteFooter;
