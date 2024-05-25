import { useDispatch } from "react-redux";
import { TMDBApiOptions } from "../utils/constant";
import genAI from "../utils/geminiAi";
import { addAiMovieResult } from "../utils/moviesSlice";

const useAiSearch = () => {
  const dispatch = useDispatch();

  const callSearchTMDBApi = async (currMovie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" + currMovie,
      TMDBApiOptions
    );
    const json = await data.json();
    return json.results;
  };

  const handleAiSearch = async (searchText) => {
    // console.log(searchText.current.value);
    const promptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText +
      ". only give me names of 5 movies, in a comma seprated way like : movie1,movie2,movie3";
    console.log(promptQuery);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(promptQuery);
    const res = await result.response;

    if (!res.candidates) {
      //TODO Error Handling - No response from AI , API failed
    }

    const aiResponse = res.candidates?.[0].content?.parts?.[0]?.text;
    //Now I will split these movies from the aiResponse to a array of movies
    const aiResMovies = aiResponse.split(",");

    //Now we will call Search TMDB Api for each movie in this array(aiResMovies)
    const promiseArr = aiResMovies.map((movie) => callSearchTMDBApi(movie));
    const tmdbMovieResults = await Promise.all(promiseArr);

    dispatch(
      addAiMovieResult({
        movieNames: aiResMovies,
        movieResults: tmdbMovieResults,
      })
    );

    console.log(tmdbMovieResults);
  };

  return { handleAiSearch };
};

export default useAiSearch;
