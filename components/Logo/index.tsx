"use client";

import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import DataObjectIcon from "@mui/icons-material/DataObject";

export default function Logo() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);
  const APP_NAME = "Snippet Master";
  return (
    <div className="flex gap-2 items-center">
      <div className={`bg-theme p-[6px] rounded-md`}>
        <DataObjectIcon sx={{ fontSize: 27, color: "white" }}></DataObjectIcon>
      </div>
      <div className="flex gap-1 text-[19px]">
        <span className={`font-bold text-theme`}>{APP_NAME.split(" ")[0]}</span>
        <span
          className={`font-bold ${
            isDarkModeEnabled ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {APP_NAME.split(" ")[1]}
        </span>
      </div>
    </div>
  );
}
