import MovieList from "./MovieList";

const MovieRecommendation = ({ movies }) => {
  //MovieRecommendation - is a Secondary Container
  //We will fetch the movies from the redux-store and will pass them as the prop to all the movieLists
  // const movies = useSelector((state) => state.movies);

  //I will render moviesList if movies.length > 0
  return (
    <div className="bg-black">
      <div className="movie-list-container -mt-60 relative z-10">
        {movies?.nowPlayingMovies && (
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        )}
        {movies?.nowPlayingMovies && (
          <MovieList title={"Trending"} movies={movies?.nowPlayingMovies} />
        )}
        {movies?.popularMovies && (
          <MovieList title={"Popular"} movies={movies?.popularMovies} />
        )}
      </div>
    </div>
  );
};

export default MovieRecommendation;
