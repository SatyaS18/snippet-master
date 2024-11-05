import { useUser } from "@clerk/nextjs";
import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";
import { useEffect } from "react";

function UserProfile() {
  const {
    darkModeObject: { darkMode },
    isLoadingObject: { setIsLoading },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);
  const { user } = useUser();
  const imageUrl = user?.imageUrl;

  const imageLoader = (
    <div className="w-9 h-9 rounded-full mb-[5px] bg-slate-200"></div>
  );
  const fullNameLoader = (
    <span className="font-semibold bg-slate-100 h-4 w-[100px]"></span>
  );
  const emailLoader = (
    <div className="text-slate-500 text-[11px] bg-slate-100 h-3 w-[130px]"></div>
  );

  useEffect(() => {
    setIsLoading((_) => !!!user);
  }, [user]);

  return (
    <div className="flex gap-3 items-center">
      {!user ? (
        imageLoader
      ) : (
        <img
          src={imageUrl}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="w-9 h-9 rounded-full mb-[5px]"
        />
      )}

      <div
        className={`max-md:hidden flex flex-col text-sm ${
          !user ? "gap-1" : ""
        }`}
      >
        {!user ? (
          fullNameLoader
        ) : (
          <span
            className={`font-semibold ${isDarkModeEnabled ? "text-white" : ""}`}
          >
            {user?.firstName} {user?.lastName}
          </span>
        )}
        {!user ? (
          emailLoader
        ) : (
          <span
            className={`${
              isDarkModeEnabled ? "text-slate-400" : "text-slate-500"
            } text-[11px]`}
          >
            {user?.emailAddresses?.[0]?.emailAddress}
          </span>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
