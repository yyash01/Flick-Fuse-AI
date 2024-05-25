import { TMDB_CDN_URL } from "../utils/constant";

const MovieCard = ({ movie }) => {
  if (!movie || !movie?.poster_path) return;

  // movieCard contain a image of the movie poster
  // and that we will get through CDN + poster_path property
  //TMDB have hosted these poster images on CDN
  //using alt attribute in images - helps in accessiblity , if the image fails to load due slow connection , the alt
  //attribute helps in providing the context to the user about what would be shown here
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
