import { useGlobalContext } from "@/context";
import { MenuOutlined, CloseOutlined } from "@mui/icons-material";

export default function SidebarMenuIcon() {
  const {
    openSidebarObject: { openSidebar, setOpenSidebar },
    isMobileObject: { isMobile },
  } = useGlobalContext();

  if (!isMobile) return null;

  return (
    <>
      {!openSidebar ? (
        <MenuOutlined
          onClick={() => setOpenSidebar((_) => !openSidebar)}
          className="text-slate-500 cursor-pointer max-md:block hidden"
        />
      ) : (
        <CloseOutlined
          onClick={() => setOpenSidebar((_) => !openSidebar)}
          className="text-slate-500 cursor-pointer max-md:block hidden"
        />
      )}
    </>
  );
}
