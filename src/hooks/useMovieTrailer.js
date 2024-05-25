import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { TMDBApiOptions } from "../utils/constant";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch(); //to dispatch an action I will use useDispatch() hook

  const movieVideo = useSelector((store) => store.movies.trailerVideo);

  const filterMovieTrailer = (movieData) => {
    const movieDataTypeTrailer = movieData.filter(
      (video) => video.type === "Trailer"
    );

    const movieTrailer = movieDataTypeTrailer.length
      ? movieDataTypeTrailer[0]
      : movieData[0];

    dispatch(addTrailerVideo(movieTrailer));
    console.log("inside useMovieTrailer Hook", movieTrailer);
  };

  //fetching the movie Data and updating the store with trailer video data
  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      TMDBApiOptions
    );
    const movieData = await data.json();
    filterMovieTrailer(movieData.results);
  };

  useEffect(() => {
    if (!movieVideo) {
      getMovieVideo();
    }
  }, []);
};

export default useMovieTrailer;
