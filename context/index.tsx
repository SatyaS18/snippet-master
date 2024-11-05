"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BorderAll,
  FavoriteBorder,
  DeleteOutlineOutlined,
  Logout,
  LightMode,
  DarkMode,
  StyleOutlined,
} from "@mui/icons-material";
import {
  DarkModeType,
  GlobalContextType,
  SidebarMenu,
  SingleNoteType,
  SingleTagType,
} from "@/interfaces/context";
import { useUser } from "@clerk/nextjs";

const ContextProvider = createContext<GlobalContextType>({
  sidebarMenuObject: {
    sidebarMenu: [],
    setSidebarMenu: () => {},
  },
  secondarySidebarMenuObject: {
    secondarySidebarMenu: [],
    setSecondarySidebarMenu: () => {},
  },
  openNewTagsWindowObject: {
    openNewTagsWindow: false,
    setOpenNewTagsWindow: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },
  openSidebarObject: {
    openSidebar: true,
    setOpenSidebar: () => {},
  },
  openNoteContentObject: {
    openNoteContent: false,
    setOpenNoteContent: () => {},
  },
  isMobileObject: {
    isMobile: false,
    setIsMobile: () => {},
  },
  isLoadingObject: {
    isLoading: false,
    setIsLoading: () => {},
  },
  allNotesObject: {
    allNotes: [],
    setAllNotes: () => {},
  },
  allTagsObject: {
    allTags: [],
    setAllTags: () => {},
  },
  selectedNoteObject: {
    selectedNote: null,
    setSelectedNote: () => {},
  },
  selectedTagsObject: {
    selectedTags: [],
    setSelectedTags: () => {},
  },
  isNewNoteObject: {
    isNewNote: false,
    setIsNewNote: () => {},
  },
  tagEditModeObject: {
    tagEditMode: null,
    setTagEditMode: () => {},
  },
  clerkUserIdObject: {
    clerkUserId: null,
    setClerkUserId: () => {},
  },
  snippetSearchObject: {
    snippetSearch: null,
    setSnippetSearch: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const user = useUser();

  const [sidebarMenu, setSidebarMenu] = useState<Array<SidebarMenu>>([
    {
      id: 1,
      name: "All Snippets",
      isSelected: true,
      icon: <BorderAll sx={{ fontSize: 18 }} />,
    },
    {
      id: 2,
      name: "Favorites",
      isSelected: false,
      icon: <FavoriteBorder sx={{ fontSize: 18 }} />,
    },
    {
      id: 3,
      name: "Trash",
      isSelected: false,
      icon: <DeleteOutlineOutlined sx={{ fontSize: 18 }} />,
    },
  ]);

  const [secondarySidebarMenu, setSecondarySidebarMenu] = useState<
    Array<SidebarMenu>
  >([
    {
      id: 4,
      name: "Tags",
      isSelected: false,
      icon: <StyleOutlined sx={{ fontSize: 18 }} />,
    },
    {
      id: 5,
      name: "Logout",
      isSelected: false,
      icon: <Logout sx={{ fontSize: 18 }} />,
    },
  ]);

  const [openNewTagsWindow, setOpenNewTagsWindow] = useState<boolean>(false);

  const [darkMode, setDarkMode] = useState<Array<DarkModeType>>([
    {
      id: 1,
      icon: <LightMode sx={{ fontSize: 18 }} />,
      type: "light",
      isSelected: true,
    },
    {
      id: 2,
      icon: <DarkMode sx={{ fontSize: 18 }} />,
      type: "dark",
      isSelected: false,
    },
  ]);

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openNoteContent, setOpenNoteContent] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allNotes, setAllNotes] = useState<Array<SingleNoteType>>([]);
  const [selectedNote, setSelectedNote] = useState<SingleNoteType | null>(null);
  const [isNewNote, setIsNewNote] = useState<boolean>(false);
  const [allTags, setAllTags] = useState<Array<SingleTagType>>([]);
  const [selectedTags, setSelectedTags] = useState<Array<SingleTagType>>([]);
  const [tagEditMode, setTagEditMode] = useState<string | null>(null);
  const [clerkUserId, setClerkUserId] = useState<string | null>(null);
  const [snippetSearch, setSnippetSearch] = useState<string | null>(null);

  const handleResize = () => {
    setIsMobile((_) => window.innerWidth <= 640);
  };

  const updateAllTags = () => {
    const fetchTags = async () => {
      setIsLoading(true);
      const tagsResponse = await fetch(`/api/tags?userId=${clerkUserId}`);

      if (!tagsResponse.ok) {
        throw new Error("Failed to fetch user's tags");
      }

      const tagsData = await tagsResponse.json();

      if (tagsData?.data) {
        setIsLoading(false);
        setAllTags((_) => tagsData.data as Array<SingleTagType>);
      }
    };

    if (clerkUserId) {
      fetchTags();
    }
  };

  const updateAllNotes = () => {
    const fetchNotes = async () => {
      setIsLoading(true);
      const notesResponse = await fetch(`/api/snippets?userId=${clerkUserId}`);

      if (!notesResponse.ok) {
        throw new Error("Failed to fetch user's snippets");
      }

      const notesData = await notesResponse.json();

      if (notesData?.data) {
        setIsLoading(false);
        setAllNotes((_) => notesData.data as Array<SingleNoteType>);
      }
    };

    if (clerkUserId) {
      fetchNotes();
    }
  };

  useEffect(() => {
    if (user.user?.id && user.user?.id !== clerkUserId) {
      setClerkUserId(() => user.user?.id);
    }
  }, [user.user?.id]);

  useEffect(() => {
    if (clerkUserId) {
      updateAllTags();
      updateAllNotes();
    }
  }, [clerkUserId]);

  useEffect(() => {
    setSelectedTags(() => selectedNote?.tags || []);
  }, [selectedNote]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ContextProvider.Provider
      value={{
        sidebarMenuObject: { sidebarMenu, setSidebarMenu },
        secondarySidebarMenuObject: {
          secondarySidebarMenu,
          setSecondarySidebarMenu,
        },
        openNewTagsWindowObject: {
          openNewTagsWindow,
          setOpenNewTagsWindow,
        },
        darkModeObject: { darkMode, setDarkMode },
        openSidebarObject: { openSidebar, setOpenSidebar },
        openNoteContentObject: { openNoteContent, setOpenNoteContent },
        isMobileObject: { isMobile, setIsMobile },
        isLoadingObject: { isLoading, setIsLoading },
        allNotesObject: { allNotes, setAllNotes },
        allTagsObject: { allTags, setAllTags },
        selectedNoteObject: { selectedNote, setSelectedNote },
        selectedTagsObject: { selectedTags, setSelectedTags },
        isNewNoteObject: { isNewNote, setIsNewNote },
        tagEditModeObject: { tagEditMode, setTagEditMode },
        clerkUserIdObject: { clerkUserId, setClerkUserId },
        snippetSearchObject: { snippetSearch, setSnippetSearch },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);

  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return context;
};
