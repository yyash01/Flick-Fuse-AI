import { useDispatch, useSelector } from "react-redux";
import { TMDBApiOptions } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      TMDBApiOptions
    );

    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData?.results));
    console.log("DATA : ", jsonData?.results);
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies(); //if nowPlayingMovies are not present then only make the API call
    }
  }, []);
};

export default useNowPlayingMovies;
