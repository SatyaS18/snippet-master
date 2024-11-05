import { useGlobalContext } from "@/context";
import { SingleTagType } from "@/interfaces/context";
import { isDarkMode } from "@/lib/utils";

interface NoteTagsProps {
  id: string;
  tags: Array<SingleTagType>;
}

function NoteTags({ id, tags }: NoteTagsProps) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  return (
    <div className="text-[11px] mx-4 flex flex-wrap gap-1 mt-4">
      {tags.map((tag) => (
        <span
          key={`${id}_${tag.id}`}
          className={` p-1 rounded-md px-2 font-semibold ${
            isDarkModeEnabled
              ? "bg-slate-600 text-slate-50"
              : "bg-slate-200 text-slate-900"
          }`}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}

export default NoteTags;
