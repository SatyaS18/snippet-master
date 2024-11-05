import { ReactNode } from "react";
import { useGlobalContext } from "@/context";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";

export default function Languages() {
  const {
    allNotesObject: { allNotes },
  } = useGlobalContext();

  const usedLanguages = allNotes
    .filter((note) => !!note.language && !note.isDeleted)
    .map((note) => note.language);
  const languageUsageObject: {
    [key: string]: {
      count: number;
      icon: ReactNode;
    };
  } = {};

  for (let language of usedLanguages) {
    if (languageUsageObject[language] !== undefined) {
      languageUsageObject[language].count =
        languageUsageObject[language].count + 1;
    } else {
      languageUsageObject[language] = {
        count: 1,
        icon: AVAILABLE_LANGUAGES.find(
          (lang) =>
            lang.name.trim().toLowerCase() === language.trim().toLowerCase()
        )?.icon,
      };
    }
  }

  return (
    <div className="mt-12 text-sm">
      <div className="font-bold text-slate-400">Languages</div>
      <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
        {Object.entries(languageUsageObject || {}).map(
          ([language, { icon, count }]) => (
            <div className="flex justify-between" key={`sidebar-${language}`}>
              <div className="flex gap-1 items-center capitalize">
                {icon}
                {language}
              </div>
              <span className="font-bold">{count}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
