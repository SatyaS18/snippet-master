import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/context";
import Header from "./Header";
import Searchbar from "./Searchbar";
import TagsList from "./TagsList";
import { isDarkMode } from "@/lib/utils";

function TagsWindow() {
  const {
    secondarySidebarMenuObject: {
      secondarySidebarMenu,
      setSecondarySidebarMenu,
    },
    openSidebarObject: { setOpenSidebar },
    isMobileObject: { isMobile },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const tagsWindowRef = useRef<HTMLDivElement | null>(null);

  const [tagSearch, setTagSearch] = useState<string>("");

  const isAddTagDialogOpened = (): boolean => {
    return !!document.getElementById("tagDialog");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tagsWindowRef.current &&
      !tagsWindowRef.current.contains(event.target as Node) &&
      !isAddTagDialogOpened()
    ) {
      const updatedMenu = secondarySidebarMenu.map((item) => {
        return { ...item, isSelected: false };
      });

      setSecondarySidebarMenu(() => updatedMenu);
      setOpenSidebar(() => false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={tagsWindowRef}
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "10%",
      }}
      className={`fixed m-20 z-20 p-4 rounded-md ${
        isMobile ? "w-5/6" : "w-1/2"
      } ${isDarkModeEnabled ? "bg-slate-800" : "bg-white shadow-md border"}`}
    >
      <Header />
      <Searchbar tagSearch={tagSearch} setTagSearch={setTagSearch} />
      <TagsList tagSearch={tagSearch} />
    </div>
  );
}

export default TagsWindow;
