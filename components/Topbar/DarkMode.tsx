import { useGlobalContext } from "@/context";

function DarkMode() {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  const handleClick = (id: number) => {
    const updatedModes = darkMode.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });

    setDarkMode(updatedModes);
  };

  return (
    <div className="bg-slate-100 h-[36px] w-[74px] rounded-3xl flex items-center gap-2 pl-[5px]">
      {darkMode.map((item) => (
        <div
          className={`${
            item.isSelected ? "bg-theme text-white" : "bg-slate-100 text-theme"
          } w-7 h-7 flex items-center justify-center rounded-full top-[4px] p-1 left-1 cursor-pointer select-none`}
          key={`darkmode_${item.id}`}
          onClick={() => handleClick(item.id)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}

export default DarkMode;
