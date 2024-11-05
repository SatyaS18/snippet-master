import { SingleNoteType } from "@/interfaces/context";
import ShareableNoteTitle from "./ShareableNoteTitle";
import ShareableNoteTags from "./ShareableNoteTags";
import ShareableNoteDescription from "./ShareableNoteDescription";
import ShareableNoteCodeBlock from "./ShareableNoteCodeBlock";
import ShareableNoteLanguage from "./ShareableNoteLanguage";

interface IShareableNoteProps {
  note: SingleNoteType;
}

function ShareableNote({ note }: IShareableNoteProps) {
  return (
    <div className="min-h-screen h-full w-screen flex justify-center items-center bg-slate-200">
      <div className="w-max bg-white px-8 py-6 rounded-lg shadow-2xl overflow-auto">
        <ShareableNoteTitle title={note.title} code={note.code} />
        <ShareableNoteTags tags={note.tags} />
        <ShareableNoteDescription description={note.description} />
        <ShareableNoteCodeBlock code={note.code} />
        <ShareableNoteLanguage language={note.language} />
      </div>
    </div>
  );
}

export default ShareableNote;
