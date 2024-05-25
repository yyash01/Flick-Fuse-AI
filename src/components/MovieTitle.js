const MovieTitle = ({ title, overview }) => {
  return (
    <div className="movie-title aspect-video pt-[20%] pl-10 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold ">{title}</h1>
      <p className="text-lg py-5 w-1/3">{overview}</p>
      <div className="movie-title__btn flex items-center gap-2">
        <button className="rounded-md bg-blue-500 py-1 px-6 font-medium text-white hover:bg-opacity-80">
          Play
        </button>
        <button className="bg-gray-300 px-6 py-1 font-medium text-gray-700 rounded-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default MovieTitle;
