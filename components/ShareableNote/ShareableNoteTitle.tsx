"use client";

import { truncateString } from "@/lib/utils";
import { ContentCopyOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

interface IShareableNoteTitleProps {
  title: string;
  code: string;
}

function ShareableNoteTitle({ title, code }: IShareableNoteTitleProps) {
  const handleCodeCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code Copied");
  };

  return (
    <div className="flex justify-between w-full">
      <span className="font-bold px-4 text-lg w-[87%] cursor-pointer hover:text-theme transition duration-150">
        {truncateString(title, 60)}
      </span>
      <ContentCopyOutlined
        onClick={handleCodeCopy}
        sx={{ fontSize: 18 }}
        className="cursor-pointer text-slate-400 hover:text-slate-700 duration-300"
      />
    </div>
  );
}

export default ShareableNoteTitle;
