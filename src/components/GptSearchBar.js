import labels from "../utils/labels";
import { useRef, useState, lazy, Suspense } from "react";
import useAiSearch from "../hooks/useAiSearch";

const MovieResultModal = lazy(() => import("./MovieResultModal"));

const GptSearchBar = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const searchText = useRef(null);
  const { handleAiSearch } = useAiSearch();

  const handleSearchClick = () => {
    let searchTextVal = searchText.current.value;
    if (!searchTextVal.length) return;

    setIsModalActive(!isModalActive);
    handleAiSearch(searchText.current.value);
  };

  const handleModalClick = (isModalOpen) => {
    setIsModalActive(isModalOpen);
    searchText.current.value = "";
  };

  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        {isModalActive && <MovieResultModal onClose={handleModalClick} />}
      </Suspense>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="absolute right-[40%] p-1">
          <button
            className="rounded-md bg-blue-500 py-[2px] px-3 font-medium text-white"
            onClick={handleSearchClick}
          >
            {labels.search}
          </button>
        </div>
        <input
          type="text"
          name="gpt-search"
          className="w-[400px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          placeholder={labels.gptSearchPlaceholder}
          ref={searchText}
        />
      </form>
    </div>
  );
};

export default GptSearchBar;
