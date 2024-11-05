import { useGlobalContext } from "@/context";
import { getSelectedSidebarItem, truncateString } from "@/lib/utils";
import { Favorite } from "@mui/icons-material";
import { Share } from "@mui/icons-material";
import toast from "react-hot-toast";

interface NoteHeaderProps {
  id: string;
  title: string;
  isFavorite: boolean;
}

function NoteHeader({ id, title, isFavorite }: NoteHeaderProps) {
  const {
    openNoteContentObject: { setOpenNoteContent },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { setSelectedNote },
    sidebarMenuObject: { sidebarMenu },
    clerkUserIdObject: { clerkUserId },
    isLoadingObject: { setIsLoading },
  } = useGlobalContext();

  const isTrashItem =
    getSelectedSidebarItem(sidebarMenu).trim().toLowerCase() === "trash";

  const handleSetOpenNoteContent = () => {
    if (isTrashItem) return;

    setOpenNoteContent((_) => true);
    const currentNote = allNotes.find((note) => note.id === id);
    setSelectedNote((_) => currentNote || null);
  };

  const handleShare = async () => {
    try {
      setIsLoading(() => true);

      const response = await fetch(`/api/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          share: id,
        }),
      });

      setIsLoading(() => false);
      if (!response.ok) {
        toast.error("Error: Something went wrong");
      } else {
        const data = await response.json();
        if (data?.data?.url) {
          const shareableURL = `${window.location.origin}${data?.data?.url}`;
          navigator.clipboard.writeText(shareableURL);
          toast.success(
            `Shareable URL copied to clipboard. Valid for ${data?.data?.validFor}.`
          );
        } else {
          toast.error("Error: Something went wrong");
        }
      }
    } catch (error: any) {
      setIsLoading(() => false);
      toast.error("Error: ", error?.message || error);
    }
  };

  const handleFavoriteUpdate = () => {
    const newAllNotes = allNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          isFavorite: !note.isFavorite,
        };
      }
      return note;
    });
    updateNoteInDB();
    setAllNotes((_) => newAllNotes);
  };

  const updateNoteInDB = async () => {
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
          isFavorite: !currentNote?.isFavorite,
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
    <div className="flex justify-between mx-4">
      <span
        className="font-bold text-lg w-[87%] cursor-pointer hover:text-theme transition duration-150"
        onClick={handleSetOpenNoteContent}
      >
        {truncateString(title, 60)}
      </span>

      {!isTrashItem && (
        <div className="flex gap-2">
          <Favorite
            onClick={handleFavoriteUpdate}
            className={`cursor-pointer hover:text-red-700 hover:fill-red-700 ${
              isFavorite ? "text-red-700 fill-red-700" : "text-slate-400"
            }`}
          />
          <Share
            onClick={handleShare}
            className={`cursor-pointer text-slate-400 hover:text-blue-700`}
          />
        </div>
      )}
    </div>
  );
}

export default NoteHeader;
