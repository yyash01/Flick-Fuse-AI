export const TMDBApiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_API_KEY,
  },
};

export const TMDB_CDN_URL = "https://image.tmdb.org/t/p/w300";
export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_AI_KEY;
