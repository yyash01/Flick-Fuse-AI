import { useDispatch, useSelector } from "react-redux";
import { TMDBApiOptions } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

//this hook will fetch the Now Playing Movies and update the redux-store
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  // for memoization We will first fetch the nowPlayingMovies , if they are already present in my store we will not make a API call again
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  //TMDB Api call for fetching Movies data
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      TMDBApiOptions
    );

    //so this FETCH Api returns a response object and the body of the response object is A readable stream ,
    //and i have to convert that into json format.

    // using .json() method it returns a promise which resolves with the result of parsing the data into json.
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData?.results));
    console.log("DATA : ", jsonData?.results);
  };

  //I will call getNowPlayingMovies Method inside my useEffect because I want to make the API call only once.
  //whenever my component renders the First time , that time I'll make the Api Call only.

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies(); //if nowPlayingMovies are not present then only make the API call
    }
  }, []);
};

export default useNowPlayingMovies;
