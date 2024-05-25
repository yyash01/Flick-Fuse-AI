import { useEffect } from "react";
import { TMDBApiOptions } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      TMDBApiOptions
    );

    const jsonData = await data.json(); // json method resolves the result by parsing it into json format
    const popularMovies = jsonData.results;
    dispatch(addPopularMovies(popularMovies));
  };

  useEffect(() => {
    if (!popularMovies) {
      getPopularMovies();
    }
  }, []);
};

export default usePopularMovies;
