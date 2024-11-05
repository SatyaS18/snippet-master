import toast from "react-hot-toast";
import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import { SingleTagType } from "@/interfaces/context";

interface ButtonGroupProps {
  tagName: string;
  handleErrorMessageChange: (error: string) => void;
}

function ButtonGroup({ tagName, handleErrorMessageChange }: ButtonGroupProps) {
  const {
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    darkModeObject: { darkMode },
    tagEditModeObject: { tagEditMode, setTagEditMode },
    clerkUserIdObject: { clerkUserId },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const handleCancelButton = () => {
    setOpenNewTagsWindow(() => false);
    setTagEditMode(() => null);
  };

  const handleAddButton = () => {
    if (tagName.trim().length === 0) {
      handleErrorMessageChange("Tag cannot be empty");
      return;
    }

    if (
      allTags.some(
        (tag) => tag.name.trim().toLowerCase() === tagName.trim().toLowerCase()
      )
    ) {
      handleErrorMessageChange("Tag already exists");
      return;
    }

    if (tagEditMode) {
      updateTagInDB();
      setAllTags((prev) => {
        return prev.map((prevTag) => {
          if (prevTag.id === tagEditMode) {
            return {
              ...prevTag,
              name: tagName,
            };
          } else {
            return prevTag;
          }
        });
      });
    } else {
      saveNewTagInDB();

      setAllTags((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: tagName,
        },
      ]);
    }
    setOpenNewTagsWindow(false);
    setTagEditMode(() => null);
  };

  const saveNewTagInDB = async () => {
    try {
      const tagInfo: SingleTagType = {
        id: crypto.randomUUID(),
        name: tagName,
      };
      const response = await fetch(`/api/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...tagInfo, clerkUserId }),
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

  const updateTagInDB = async () => {
    try {
      const tagInfo: SingleTagType = {
        id: tagEditMode || "",
        name: tagName,
      };
      const response = await fetch(`/api/tags?id=${tagEditMode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...tagInfo, clerkUserId }),
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
    <div className="flex justify-between mt-6 gap-2 text-[12px]">
      <button
        onClick={handleCancelButton}
        className={`${
          isDarkModeEnabled ? "border-slate-700" : ""
        } border text-[12px] w-full px-10 p-3 rounded-md`}
      >
        Cancel
      </button>{" "}
      <button
        onClick={handleAddButton}
        className=" text-white bg-theme text-[12px] w-full px-10 p-3 rounded-md"
      >
        {tagEditMode ? "Edit Tag" : "Add Tag"}
      </button>
    </div>
  );
}

export default ButtonGroup;
