import labels from "../utils/labels";
import { useRef, useState, lazy, Suspense } from "react";
import { IoIosSearch } from "react-icons/io";
import useAiSearch from "../hooks/useAiSearch";
import genAI from "../utils/ai/geminiAi";
import useDebounceApi from "../hooks/useDebounceApi";

const MovieResultModal = lazy(() => import("./MovieResultModal"));

const STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const GptSearchBar = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE); //status for getting suggestions
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

  const handleSuggestionClick = (event) => {
    const movieSuggestion = event?.target?.dataset?.suggestion;
    searchText.current.value = movieSuggestion;
    setStatus(STATUS.IDLE);
    setResult([]);
    console.log(event?.target?.dataset?.suggestion);
  };

  const fetchData = async () => {
    console.log("this fetchData");
    if (isSearchTextEmpty()) {
      return; //No Api call if search is Empty
    }

    const promptQuery =
      "Provide 10 movie genres,sub-genres List that start with the string " +
      searchText?.current?.value +
      ". in a comma seprated way like : genres1,genres2,genres3";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(promptQuery);
      const res = await result.response;
      const data = res?.candidates?.[0]?.content?.parts?.[0]?.text;

      console.log(data);
      setResult(data?.split(","));
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      console.log(error);
      setStatus(STATUS.ERROR);
    }
  };

  const debounceApiFn = useDebounceApi(fetchData, 1000);

  function handleInputChange() {
    setStatus(STATUS.LOADING);
    debounceApiFn();
  }

  function isSearchTextEmpty() {
    let searchQuery = searchText?.current?.value;
    return searchQuery?.trim().length === 0;
  }

  return (
    <div>
      <Suspense fallback={<div></div>}>
        {isModalActive && <MovieResultModal onClose={handleModalClick} />}
      </Suspense>
      <div className="input-form">
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
            onChange={handleInputChange}
          />
          <button
            className="h-full p-2 rounded-r-md bg-blue-500 font-medium text-white"
            onClick={handleSearchClick}
          >
            <IoIosSearch className="h-5 w-5" />
          </button>
        </form>
        {status === STATUS.LOADING && (
          <div className="absolute w-full sm:w-64 md:w-80 lg:w-96 bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-hidden shadow-lg z-10 p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        )}
        {status === STATUS.ERROR && <h2>Error Occured</h2>}
        {status === STATUS.SUCCESS && (
          <ul
            onClick={handleSuggestionClick}
            className="absolute w-full sm:w-64 md:w-80 lg:w-96 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg z-10"
          >
            {result.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                data-suggestion={suggestion}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GptSearchBar;
