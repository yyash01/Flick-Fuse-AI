import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MoviePlayer = ({ movieId }) => {
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((state) => state.movies?.trailerVideo);

  if (!trailerVideo) return;

  return (
    <div className="movie-trailer">
      <iframe
        className="w-full h-full aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default MoviePlayer; // Video Background
