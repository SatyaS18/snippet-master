import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import { SingleNoteType } from "@/interfaces/context";
import NoteHeader from "./NoteHeader";
import NoteDate from "./NoteDate";
import NoteTags from "./NoteTags";
import NoteDescription from "./NoteDescription";
import CodeBlock from "./CodeBlock";
import NoteFooter from "./NoteFooter";

interface NoteProps {
  note: SingleNoteType;
}

function Note({ note }: NoteProps) {
  const {
    darkModeObject: { darkMode },
    openNoteContentObject: { openNoteContent },
  } = useGlobalContext();
  const isDarkModeEnabled = isDarkMode(darkMode);

  return (
    <div
      className={`flex flex-col ${
        isDarkModeEnabled ? "bg-slate-800 text-white" : "bg-white"
      } max-sm:w-full ${
        openNoteContent ? "w-full" : "w-[380px]"
      } rounded-md py-8 relative`}
    >
      <NoteHeader
        id={note.id}
        title={note.title}
        isFavorite={note.isFavorite}
      />
      <NoteDate date={note.createdOn} />
      <NoteTags id={note.id} tags={note.tags} />
      <NoteDescription description={note.description} />
      <CodeBlock code={note.code} language={note.language} />
      <NoteFooter id={note.id} language={note.language} />
    </div>
  );
}

export default Note;
