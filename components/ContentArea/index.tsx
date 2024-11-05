import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import TopBar from "../Topbar";
import SwiperSelection from "../SwiperSelection";
import AllNotes from "../AllNotes";
import NoteContent from "../NoteContent";

function ContentArea() {
  const {
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);
  return (
    <div
      className={`w-full flex flex-col gap-4 p-5 ${
        isDarkModeEnabled ? "bg-slate-700" : "bg-slate-100"
      } ${isMobile ? "min-h-screen" : ""}`}
    >
      <div className="flex flex-col gap-6">
        <TopBar />
        <SwiperSelection />
      </div>
      <div className={`flex gap-2 w-full`}>
        <AllNotes />
        <NoteContent />
      </div>
    </div>
  );
}

export default ContentArea;
