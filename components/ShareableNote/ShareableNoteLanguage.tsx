import { AVAILABLE_LANGUAGES } from "@/constants/languages";
import { SingleLanguageType } from "@/interfaces/context";

interface IShareableNoteLanguageProps {
  language: string;
}

function ShareableNoteLanguage({ language }: IShareableNoteLanguageProps) {
  const currentLanguage: SingleLanguageType =
    AVAILABLE_LANGUAGES.find(
      (lang) => lang.name.trim().toLowerCase() === language.trim().toLowerCase()
    ) || AVAILABLE_LANGUAGES[0];

  return (
    <div className="mt-2 flex gap-1 items-center">
      {currentLanguage.icon}
      <span className="capitalize">{currentLanguage.name}</span>
    </div>
  );
}

export default ShareableNoteLanguage;
