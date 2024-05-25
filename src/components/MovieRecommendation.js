import MovieList from "./MovieList";

const MovieRecommendation = ({ movies }) => {
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
