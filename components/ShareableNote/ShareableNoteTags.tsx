import { SingleTagType } from "@/interfaces/context";

interface IShareableNoteTagsProps {
  tags: Array<SingleTagType>;
}

function ShareableNoteTags({ tags }: IShareableNoteTagsProps) {
  return (
    <div className="text-[11px] mx-4 flex flex-wrap gap-1 mt-4">
      {tags.map((tag) => (
        <span
          id={tag.id}
          key={tag.id}
          className="p-1 rounded-md px-2 font-semibold bg-slate-200 text-slate-900"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}

export default ShareableNoteTags;
