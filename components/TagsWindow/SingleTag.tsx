import {
  DeleteRounded,
  DragIndicatorOutlined,
  EditRounded,
} from "@mui/icons-material";
import { useGlobalContext } from "@/context";
import { SingleTagType } from "@/interfaces/context";
import { isDarkMode } from "@/lib/utils";
import toast from "react-hot-toast";

interface SingleTagProps {
  tag: SingleTagType;
}

function SingleTag({ tag }: SingleTagProps) {
  const {
    allNotesObject: { allNotes },
    allTagsObject: { setAllTags },
    tagEditModeObject: { setTagEditMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const tagCount = allNotes.filter((note) =>
    note.tags.some((noteTag) => noteTag.id === tag.id)
  ).length;

  const handleTagDelete = () => {
    setAllTags((prev) => prev.filter((prevTag) => prevTag.id !== tag.id));
    deleteTagInDB();
  };

  const handleTagEdit = () => {
    setTagEditMode(() => tag.id);
    setOpenNewTagsWindow(() => true);
  };

  const deleteTagInDB = async () => {
    try {
      const response = await fetch(`/api/tags?id=${tag.id}`, {
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
      }
    } catch (error: any) {
      toast.error("Error: ", error?.message || error);
    }
  };

  return (
    <div
      className={`p-2 rounded-lg flex gap-3 items-center justify-between px-4 ${
        isDarkModeEnabled ? "bg-slate-800" : "bg-white"
      }`}
    >
      <div className="flex gap-3 items-center">
        <DragIndicatorOutlined className="text-slate-400 cursor-pointer" />
        <div className="w-2 h-2 bg-theme rounded-full"></div>
        <div className="flex flex-col">
          <span
            className={`font-bold ${
              isDarkModeEnabled ? "text-white" : "text-black"
            }`}
          >
            {tag.name}
          </span>
          <span className="text-slate-400 text-[12px]">
            {tagCount} Snippet{tagCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div
          className={`rounded-full w-7 h-7 flex items-center justify-center cursor-pointer ${
            isDarkModeEnabled
              ? "bg-slate-700 hover:bg-slate-500"
              : "bg-slate-200 hover:bg-slate-300"
          }`}
        >
          <EditRounded
            onClick={handleTagEdit}
            className="text-slate-400"
            sx={{ fontSize: 15 }}
          />
        </div>
        <div
          className={`rounded-full w-7 h-7 flex items-center justify-center cursor-pointer ${
            isDarkModeEnabled
              ? "bg-slate-700 hover:bg-slate-500"
              : "bg-slate-200 hover:bg-slate-300"
          }`}
        >
          <DeleteRounded
            onClick={handleTagDelete}
            className="text-slate-400"
            sx={{ fontSize: 15 }}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleTag;
