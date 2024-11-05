import { useGlobalContext } from "@/context";
import SingleTag from "./SingleTag";
import { isDarkMode } from "@/lib/utils";
import { StyleOutlined } from "@mui/icons-material";

interface TagListProps {
  tagSearch: string;
}

function TagsList({ tagSearch }: TagListProps) {
  const {
    allTagsObject: { allTags },
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const filteredTags = allTags.filter((tag) =>
    tag.name.toLowerCase().includes((tagSearch || "").trim().toLowerCase())
  );

  return (
    <div
      className={`rounded-md p-4 h-[380px] overflow-auto mt-9 flex flex-col gap-4 ${
        isDarkModeEnabled ? "bg-slate-600" : "bg-slate-50"
      }`}
    >
      {filteredTags.length > 0 ? (
        <>
          {filteredTags.map((tag) => (
            <SingleTag key={tag.id} tag={tag} />
          ))}
        </>
      ) : (
        <div
          className={`flex h-full flex-col items-center justify-center ${
            isDarkModeEnabled ? "text-slate-50" : "text-slate-900"
          }`}
        >
          <StyleOutlined sx={{ fontSize: isMobile ? 48 : 64 }} />
          <p className={`mt-4 font-bold ${isMobile ? "text-xl" : "text-3xl"}`}>
            No Tags Found
          </p>
        </div>
      )}
    </div>
  );
}

export default TagsList;
