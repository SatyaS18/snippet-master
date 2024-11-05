import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { AddOutlined } from "@mui/icons-material";
import { useGlobalContext } from "@/context";
import { isDarkMode } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";
import { SingleTagType } from "@/interfaces/context";


export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags },
    selectedTagsObject: { selectedTags, setSelectedTags },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    isLoadingObject: { isLoading },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  const openAddTagsWindow = () => {
    setOpenNewTagsWindow(() => true);
  };

  const handleTagClick = (tag: SingleTagType | null) => {
    if (!tag) {
      setSelectedTags(() => []);
    } else if (selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      setSelectedTags((prev) =>
        prev.filter((selectedTag) => selectedTag.id !== tag.id)
      );
    } else {
      setSelectedTags((prev) => {
        return [...prev, tag].length === allTags.length ? [] : [...prev, tag];
      });
    }
  };

  return (
    <div
      className={`${
        isDarkModeEnabled ? "bg-slate-800 text-white" : "bg-white"
      } p-3 rounded-lg flex gap-5 justify-between`}
    >
      {isLoading ? (
        <div className="text-slate-500 text-[11px] bg-slate-100 h-10 w-full"></div>
      ) : (
        <>
          <div className="overflow-x-auto w-auto">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={10}
              freeMode={true}
              className="swiper-component"
              modules={[FreeMode]}
            >
              <SwiperSlide
                className={`${
                  selectedTags.length === 0
                    ? "bg-theme text-white"
                    : `${
                        isDarkModeEnabled
                          ? "bg-gray-700 text white"
                          : "bg-gray-100 text-gray-800"
                      }`
                } font-semibold p-1 rounded-lg w-20`}
                onClick={() => handleTagClick(null)}
              >
                All
              </SwiperSlide>
              {allTags.map((tag) => (
                <SwiperSlide
                  className={`${
                    selectedTags.some(
                      (selectedTag) => selectedTag.id === tag.id
                    )
                      ? "bg-theme text-white"
                      : `${
                          isDarkModeEnabled
                            ? "bg-gray-700 text white"
                            : "bg-gray-100 text-gray-800"
                        }`
                  } font-semibold p-1 rounded-lg w-20`}
                  key={`tag_${tag.id}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.name}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            onClick={openAddTagsWindow}
            className="bg-theme p-1 rounded-md px-3 flex gap-1 items-center text-white"
          >
            <AddOutlined sx={{ fontSize: 18 }} />
            <span>Tag</span>
          </button>
        </>
      )}
    </div>
  );
}
