import MoviePlayer from "./MoviePlayer";
import MovieRecommendation from "./MovieRecommendation";
import MovieTitle from "./MovieTitle";
import { useSelector } from "react-redux";

const MovieTrailer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies.nowPlayingMovies) return;

  const mainMovie = movies?.nowPlayingMovies?.[0];
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
