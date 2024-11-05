import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import { Search as SearchIcon } from "@mui/icons-material";
import { ChangeEvent } from "react";
import AddSnippetButton from "./AddSnippetButton";

export default function SearchBar() {
  const {
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
    snippetSearchObject: { snippetSearch, setSnippetSearch },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchString = e.target.value || "";
    setSnippetSearch(() => searchString.trim());
  };

  return (
    <div
      className={`relative pl-3 w-[60%] h-[38px] rounded-3xl flex items-center gap-2 ${
        isDarkModeEnabled ? "bg-slate-700" : "bg-slate-100"
      }`}
    >
      <SearchIcon className="text-purple-500" sx={{ fontSize: 13 }} />
      <input
        value={snippetSearch || ""}
        onChange={handleChange}
        placeholder={isMobile ? "Search..." : "Search a snippet..."}
        className={`w-[70%] outline-none text-sm text-slate-500 ${
          isDarkModeEnabled ? "bg-slate-700" : "bg-slate-100"
        }`}
      />
      <AddSnippetButton />
    </div>
  );
}
