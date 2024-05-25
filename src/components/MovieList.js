import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(title, movies);

  //to create movieCard for each movie I will map over movies

  return (
    <div className="pl-6 py-2">
      <h1 className="text-2xl py-3 text-white">{title}</h1>
      <div className="flex overflow-x-scroll gap-4 no-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
