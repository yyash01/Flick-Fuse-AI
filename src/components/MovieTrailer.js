import MoviePlayer from "./MoviePlayer";
import MovieRecommendation from "./MovieRecommendation";
import MovieTitle from "./MovieTitle";
import { useSelector } from "react-redux";

const MovieTrailer = () => {
  //will get the movie from the redux store - using - useSelector
  const movies = useSelector((store) => store.movies);

  if (!movies.nowPlayingMovies) return; // its a early return , if movies are not present in the store.

  const mainMovie = movies?.nowPlayingMovies?.[0]; // we are setting main movie as the First Movie from the redux-strore.
  //so this mainMovie is the movie that we showing as the current Movie trailer
  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <MovieTitle title={original_title} overview={overview} />
      <MoviePlayer movieId={id} />
      <MovieRecommendation movies={movies} />
    </div>
  );
};

export default MovieTrailer;
