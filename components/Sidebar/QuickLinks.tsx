import { useClerk } from "@clerk/nextjs";
import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";

function SidebarLinks() {
  const { signOut } = useClerk();
  const {
    sidebarMenuObject: { sidebarMenu, setSidebarMenu },
    secondarySidebarMenuObject: {
      secondarySidebarMenu,
      setSecondarySidebarMenu,
    },
    openSidebarObject: { setOpenSidebar },
    darkModeObject: { darkMode },
    snippetSearchObject: { setSnippetSearch },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const handleClick = (type: "primary" | "secondary", id: number) => {
    if (type === "primary") {
      const updatedMenu = sidebarMenu.map((item) => {
        if (item.id === id) {
          return { ...item, isSelected: true };
        } else {
          return { ...item, isSelected: false };
        }
      });

      setSidebarMenu(updatedMenu);
    } else if (type === "secondary") {
      const updatedMenu = secondarySidebarMenu.map((item) => {
        if (item.id === id) {
          if (item.name.trim().toLowerCase() === "logout") {
            handleLogout();
          }
          return { ...item, isSelected: true };
        } else {
          return { ...item, isSelected: false };
        }
      });

      setSecondarySidebarMenu(updatedMenu);
    }
    setOpenSidebar(() => false);
    setSnippetSearch(() => null);
  };

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <div className="flex flex-col gap-12">
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        {sidebarMenu.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleClick("primary", item.id);
            }}
            className={`flex cursor-pointer select-none gap-2 items-center p-[7px] px-2 rounded-md w-[80%] border border-sm border-none ${
              item.isSelected
                ? "bg-theme text-white"
                : `${
                    isDarkModeEnabled
                      ? "bg-slate-800 text-slate-400"
                      : "bg-white text-theme"
                  }  hover:bg-theme hover:text-white`
            } transition duration-200`}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        {secondarySidebarMenu.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleClick("secondary", item.id);
            }}
            className={`flex cursor-pointer select-none gap-2 items-center p-[7px] px-2 rounded-md w-[80%] border border-sm border-none ${
              item.isSelected
                ? "bg-theme text-white"
                : `${
                    isDarkModeEnabled
                      ? "bg-slate-800 text-slate-400"
                      : "bg-white text-theme"
                  }  hover:bg-theme hover:text-white`
            } transition duration-200`}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuickLinks() {
  return (
    <div className="mt-20 text-sm">
      <div className="font-bold text-slate-400">Quick Links</div>
      <SidebarLinks />
    </div>
  );
}
