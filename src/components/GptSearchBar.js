import labels from "../utils/labels";
import { useRef, useState, lazy, Suspense } from "react";
import { IoIosSearch } from "react-icons/io";
import useAiSearch from "../hooks/useAiSearch";
const MovieResultModal = lazy(() => import("./MovieResultModal"));

const GptSearchBar = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const searchText = useRef(null);
  const { handleAiSearch } = useAiSearch();

  const handleSearchClick = () => {
    let searchTextVal = searchText.current.value;
    if (!searchTextVal.length) return;
    handleAiSearch(searchText.current.value);
    setIsModalActive(!isModalActive);
  };

  const handleModalClick = (isModalOpen) => {
    setIsModalActive(isModalOpen);
    searchText.current.value = "";
  };

  return (
    <div>
      <Suspense fallback={<div></div>}>
        {isModalActive && <MovieResultModal onClose={handleModalClick} />}
      </Suspense>
      <form
        className="h-full w-full flex items-center justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="gpt-search"
          className="w-full sm:w-64 md:w-80 lg:w-96 rounded-l-lg border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-blue-500 focus:outline-none"
          placeholder={labels.gptSearchPlaceholder}
          ref={searchText}
        />
        <button
          className="h-full p-2 rounded-r-md bg-blue-500 font-medium text-white"
          onClick={handleSearchClick}
        >
          <IoIosSearch className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
