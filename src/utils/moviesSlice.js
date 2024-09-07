import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    aiMovieNames: null,
    aiMovieResult: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addAiMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.aiMovieNames = movieNames;
      state.aiMovieResult = movieResults;
    },
    clearAiMovieResult: (state, action) => {
      state.aiMovieNames = null;
      state.aiMovieResult = null;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addAiMovieResult,
  clearAiMovieResult,
} = moviesSlice.actions;

export default moviesSlice.reducer; //exporting the reducer
