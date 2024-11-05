import { Dispatch, SetStateAction, useState } from "react";
import { SingleLanguageType, SingleNoteType } from "@/interfaces/context";
import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import {
  CodeOutlined,
  ContentCopyOutlined,
  DoneAllOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import NoteContentCodeBlockLanguageMenu from "./NoteContentCodeBlockLanguageMenu";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";

interface INoteContentCodeBlockProps {
  singleNote: SingleNoteType;
  setSingleNote: Dispatch<SetStateAction<SingleNoteType | undefined>>;
}

function NoteContentCodeBlock({
  singleNote,
  setSingleNote,
}: INoteContentCodeBlockProps) {
  const {
    darkModeObject: { darkMode },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();
  const isDarkModeEnabled = isDarkMode(darkMode);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SingleLanguageType>(
    AVAILABLE_LANGUAGES[0]
  );

  const handleLanguageUpdate = (language: SingleLanguageType) => {
    const newSingleNote: SingleNoteType = {
      ...singleNote,
      language: language.name,
    };
    setSingleNote(newSingleNote);

    setSelectedLanguage(
      () =>
        AVAILABLE_LANGUAGES.find((l) => l.id === language.id) ||
        AVAILABLE_LANGUAGES[0]
    );

    const newAllNotes = allNotes.map((note) => {
      if (note.id === newSingleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes((_) => newAllNotes);
    setIsOpened(false);
  };

  const handleCodeUpdate = (newCode: string) => {
    const newSingleNote: SingleNoteType = {
      ...singleNote,
      code: newCode,
    };
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      if (note.id === newSingleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes((_) => newAllNotes);
  };

  const handleCodeCopy = () => {
    navigator.clipboard.writeText(singleNote.code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  };

  return (
    <div className="flex gap-2 text-[12px] text-slate-400 mt-8">
      <CodeOutlined
        sx={{ fontSize: 18 }}
        className={`mt-[9px] ${
          isHovered || isFocused ? "text-theme" : "text-slate-400"
        }`}
      />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className={`${
          isHovered || isFocused ? "border-theme" : ""
        } border rounded-lg p-3 pt-16 w-full relative`}
      >
        <div className="absolute top-4 right-4 z-50">
          <IconButton disabled={isCopied}>
            {isCopied ? (
              <DoneAllOutlined
                sx={{ fontSize: 18 }}
                className={`${
                  isDarkModeEnabled ? "text-white" : "text-slate-400"
                }`}
              />
            ) : (
              <ContentCopyOutlined
                onClick={handleCodeCopy}
                sx={{ fontSize: 18 }}
                className={`${
                  isDarkModeEnabled ? "text-white" : "text-slate-400"
                }`}
              />
            )}
          </IconButton>
        </div>
        <div
          onClick={() => setIsOpened((p) => !p)}
          className={`flex gap-2 justify-between bg-slate-100 p-[6px] px-3 rounded-md items-center text-[12px] mt-3 absolute top-1 left-3 ${
            isDarkModeEnabled
              ? "bg-slate-600 text-white"
              : "bg-slate-100 text-slate-400"
          } cursor-pointer`}
        >
          <div className="flex gap-1 items-center">
            {selectedLanguage.icon}
            <span className="mt-[1ox]">{selectedLanguage.name}</span>
          </div>
          {isOpened ? (
            <KeyboardArrowUpOutlined sx={{ fontSize: 18 }} />
          ) : (
            <KeyboardArrowDownOutlined sx={{ fontSize: 18 }} />
          )}
        </div>

        {isOpened && (
          <NoteContentCodeBlockLanguageMenu
            value={singleNote.language}
            setIsOpened={setIsOpened}
            handleLanguageUpdate={handleLanguageUpdate}
          />
        )}

        <AceEditor
          placeholder="Add your code here..."
          mode="javascript"
          theme="tomorrow"
          name={`code-editor-${singleNote.id}`}
          width="100%"
          height="300px"
          fontSize={14}
          lineHeight={19}
          showPrintMargin={false}
          showGutter={false}
          highlightActiveLine={false}
          onChange={handleCodeUpdate}
          className={`${
            isDarkModeEnabled ? "bg-transparent text-white" : "bg-white"
          }`}
          value={singleNote.code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: false,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}

export default NoteContentCodeBlock;
