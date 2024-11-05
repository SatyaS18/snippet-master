import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NoteContentTagsMenu from "./NoteContentTagsMenu";
import { StyleOutlined, EditOutlined } from "@mui/icons-material";
import { SingleNoteType, SingleTagType } from "@/interfaces/context";
import { useGlobalContext } from "@/context";

interface INoteContentTagsProps {
  singleNote: SingleNoteType;
  setSingleNote: Dispatch<SetStateAction<SingleNoteType | undefined>>;
}

function NoteContentTags({ singleNote, setSingleNote }: INoteContentTagsProps) {
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [hovered, setHovered] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  const handleTagClick = (tag: SingleTagType) => {
    const newSingleNote: SingleNoteType = JSON.parse(
      JSON.stringify(singleNote || {})
    );

    if (singleNote.tags.some((t) => t.id === tag.id)) {
      newSingleNote["tags"] = singleNote.tags.filter((t) => t.id !== tag.id);
    } else {
      newSingleNote["tags"] = [...newSingleNote["tags"], tag];
    }

    const newAllNotes = allNotes.map((note) => {
      if (note.id === newSingleNote.id) {
        return newSingleNote;
      }
      return note;
    });
    setSingleNote(newSingleNote);
    setAllNotes((_) => newAllNotes);
  };

  return (
    <div className="flex text-[13px] items-center gap-2">
      <StyleOutlined
        sx={{ fontSize: 19 }}
        className={`${hovered ? "text-theme" : "text-slate-400"}`}
      />
      <div
        className="relative flex justify-between w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!isOpened) {
            setHovered(false);
          }
        }}
      >
        <div className="flex gap-2 items-center flex-wrap">
          {singleNote.tags.length > 0 ? (
            <>
              {singleNote.tags.map((tag, index) => (
                <div
                  key={`new_note_${singleNote.id}_${index}`}
                  className="bg-slate-100 text-slate-400 p-1 px-2 rounded-md"
                >
                  {tag.name}
                </div>
              ))}
            </>
          ) : (
            <div className="bg-slate-100 text-slate-400 p-1 px-2 rounded-md">
              No Tags
            </div>
          )}
          {hovered && (
            <EditOutlined
              sx={{ fontSize: 19 }}
              onClick={() => setIsOpened((_) => !isOpened)}
              className="text-slate-400 cursor-pointer"
            />
          )}
        </div>
        {isOpened && (
          <NoteContentTagsMenu
            tags={singleNote.tags}
            handleTagClick={handleTagClick}
            setIsOpened={setIsOpened}
          />
        )}
      </div>
    </div>
  );
}

export default NoteContentTags;
