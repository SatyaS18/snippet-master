import { Dispatch, ReactNode, SetStateAction } from "react";

export interface SidebarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icon: ReactNode;
}

export type Theme = "light" | "dark";
export interface DarkModeType {
  id: number;
  type: Theme;
  isSelected: boolean;
  icon: ReactNode;
}

export interface SingleNoteType {
  id: string;
  title: string;
  isFavorite: boolean;
  tags: Array<SingleTagType>;
  description: string;
  code: string;
  language: string;
  createdOn: string;
  isDeleted: boolean;
}
export interface SingleTagType {
  id: string;
  name: string;
}

export interface SingleLanguageType {
  id: string;
  name: string;
  icon: JSX.Element;
}

export interface GlobalContextType {
  sidebarMenuObject: {
    sidebarMenu: Array<SidebarMenu>;
    setSidebarMenu: Dispatch<SetStateAction<Array<SidebarMenu>>>;
  };
  secondarySidebarMenuObject: {
    secondarySidebarMenu: Array<SidebarMenu>;
    setSecondarySidebarMenu: Dispatch<SetStateAction<Array<SidebarMenu>>>;
  };
  openNewTagsWindowObject: {
    openNewTagsWindow: boolean;
    setOpenNewTagsWindow: Dispatch<SetStateAction<boolean>>;
  };
  darkModeObject: {
    darkMode: Array<DarkModeType>;
    setDarkMode: Dispatch<SetStateAction<Array<DarkModeType>>>;
  };
  openSidebarObject: {
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  };
  openNoteContentObject: {
    openNoteContent: boolean;
    setOpenNoteContent: Dispatch<SetStateAction<boolean>>;
  };
  isMobileObject: {
    isMobile: boolean;
    setIsMobile: Dispatch<SetStateAction<boolean>>;
  };
  isLoadingObject: {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };
  allNotesObject: {
    allNotes: Array<SingleNoteType>;
    setAllNotes: Dispatch<SetStateAction<Array<SingleNoteType>>>;
  };
  allTagsObject: {
    allTags: Array<SingleTagType>;
    setAllTags: Dispatch<SetStateAction<Array<SingleTagType>>>;
  };
  selectedNoteObject: {
    selectedNote: SingleNoteType | null;
    setSelectedNote: Dispatch<SetStateAction<SingleNoteType | null>>;
  };
  selectedTagsObject: {
    selectedTags: Array<SingleTagsType>;
    setSelectedTags: Dispatch<SetStateAction<Array<SingleTagType>>>;
  };
  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: Dispatch<SetStateAction<boolean>>;
  };
  tagEditModeObject: {
    tagEditMode: string | null;
    setTagEditMode: Dispatch<SetStateAction<string | null>>;
  };
  clerkUserIdObject: {
    clerkUserId: string | null;
    setClerkUserId: Dispatch<SetStateAction<string | null>>;
  };
  snippetSearchObject: {
    snippetSearch: string | null;
    setSnippetSearch: Dispatch<SetStateAction<string | null>>;
  };
}
