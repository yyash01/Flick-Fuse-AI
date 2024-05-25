import { TMDB_CDN_URL } from "../utils/constant";

const MovieCard = ({ movie }) => {
  if (!movie || !movie?.poster_path) return;

  return (
    <div className="w-48 flex-shrink-0">
      <img
        className="rounded-lg"
        alt={movie?.original_title}
        src={TMDB_CDN_URL + movie?.poster_path}
      />
    </div>
  );
};

export default MovieCard;
