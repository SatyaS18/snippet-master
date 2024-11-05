import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import { ErrorOutlineOutlined } from "@mui/icons-material";

interface TagInputProps {
  tagName: string;
  errorMessage: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleErrorMessageChange: (error: string) => void;
}

function TagInput({
  tagName,
  errorMessage,
  handleInputChange,
  handleErrorMessageChange,
}: TagInputProps) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [errorMessage]);

  return (
    <div className="mt-6">
      <span className="text-slate-400 text-sm font-semibold">Tag Name</span>
      <input
        ref={inputRef}
        value={tagName}
        onChange={handleInputChange}
        placeholder="For Example, Login Form"
        className={`${
          isDarkModeEnabled ? "bg-slate-800" : "bg-white border text-slate-600"
        } w-full rounded-md p-2 mt-1 text-[12px] outline-none`}
      />
      {errorMessage && (
        <div className="text-red-500 flex mt-2 gap-1 items-center">
          <ErrorOutlineOutlined className="text-[13px]" />
          <span className="text-red-500 text-[11px]">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default TagInput;
