import { formatDate } from "@/lib/utils";

interface NoteDateProps {
  date: string;
}

function NoteDate({ date }: NoteDateProps) {
  return (
    <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
      <span className="">{formatDate(date)}</span>
    </div>
  );
}

export default NoteDate;
