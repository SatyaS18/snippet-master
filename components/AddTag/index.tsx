import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import Header from "./Header";
import TagInput from "./TagInput";
import ButtonGroup from "./ButtonGroup";

function AddTag() {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
    tagEditModeObject: { tagEditMode, setTagEditMode },
    allTagsObject: { allTags },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);
  const tagsWindowRef = useRef<HTMLDivElement | null>(null);
  const [tagName, setTagName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleErrorMessageChange = (newError: string) => {
    setErrorMessage(() => newError);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleErrorMessageChange("");
    setTagName(() => e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tagsWindowRef.current &&
      !tagsWindowRef.current.contains(event.target as Node)
    ) {
      setOpenNewTagsWindow(() => false);
      setTagEditMode(() => null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    handleErrorMessageChange("");

    if (tagEditMode) {
      const selectedTag = allTags.find((tag) => tag.id === tagEditMode);

      if (selectedTag) {
        setTagName(() => selectedTag.name);
      } else {
        setTagName("");
      }
    } else {
      setTagName("");
    }
  }, [openNewTagsWindow, tagEditMode]);

  return (
    <div
      ref={tagsWindowRef}
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "20%",
      }}
      id={`tagDialog`}
      className={`fixed z-20 px-4 py-2 max-sm:w-[350px] w-[500px] shadow-md ${
        isDarkModeEnabled ? "bg-slate-900 text-white" : "bg-white border"
      } rounded-md`}
    >
      <Header />
      <TagInput
        tagName={tagName}
        handleInputChange={handleInputChange}
        errorMessage={errorMessage}
        handleErrorMessageChange={handleErrorMessageChange}
      />
      <ButtonGroup
        tagName={tagName}
        handleErrorMessageChange={handleErrorMessageChange}
      />
    </div>
  );
}

export default AddTag;
