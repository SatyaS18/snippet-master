import { useGlobalContext } from "@/context";
import { isDarkMode, truncateString } from "@/lib/utils";

interface NoteDescriptionProps {
  description: string;
}

function NoteDescription({ description }: NoteDescriptionProps) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  return (
    <div
      className={`${
        isDarkModeEnabled ? "text-slate-300" : "text-slate-600"
      } text-[13px] mt-4 mx-4 font-medium mb-2`}
    >
      {truncateString(description, 200)}
    </div>
  );
}

export default NoteDescription;
