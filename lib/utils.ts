import { SidebarMenu, DarkModeType } from "@/interfaces/context";

export const isDarkMode = (themeConfig: Array<DarkModeType>): boolean =>
  themeConfig.find((item) => item.isSelected)?.type === "dark";

export const getSelectedSidebarItem = (sidebar: Array<SidebarMenu>): string => {
  return sidebar.find((item) => item.isSelected)!.name;
};

export const formatDate = (isoString: string): string => {
  if (!isoString) return isoString;

  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    year: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const truncateString = (str: string, num: number): string => {
  if (str.length < num) return str;
  return str.slice(0, num) + "...";
};

export const debounce = (
  func: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
