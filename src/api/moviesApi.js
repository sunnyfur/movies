import api from "./index";
import { moviesActions } from "../store/reducers/moviesSlice";
const moviesArr = require("../mock/films.json");
const movieSample = require("../mock/film.json");
export const getListMovies =
  (path, page = 1) =>
  async (dispatch) => {
    try {
      dispatch(moviesActions.loadMoviesStart);
      const movies = await api.get(`${path}/?page=${page}`).then((res) => {
        return res.data;
      });
      dispatch(
        moviesActions.loadMoviesEnd({
          movies: movies.films,
          pagesCount: movies.pagesCount,
          currPage: page,
        })
      );
    } catch (err) {
      // dispatch(moviesActions.loadMoviesError(err.message));
      dispatch(
        moviesActions.loadMoviesEnd({
          movies: moviesArr.films,
          pagesCount: moviesArr.pagesCount,
          currPage: page,
        })
      );
    }
  };
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch(moviesActions.loadMovieStart);
    const movie = await api.get(`/films/${id}`).then((res) => res.data);
    dispatch(moviesActions.loadMovieEnd(movie));
  } catch (err) {
    // dispatch(moviesActions.loadMovieError(err.message));
    dispatch(moviesActions.loadMovieEnd(movieSample));
  }
};

export const getListMoviesPage = () => async (dispatch) => {};

export const getFilmsFilters = () => async (dispatch) => {
  try {
    const filters = await api.get(`/films/filters`).then((res) => res.data);
    dispatch(moviesActions.loadFiltersAll(filters));
  } catch (err) {
    dispatch(
      moviesActions.loadFiltersAll({
        genres: [
          { genre: "фантастика", id: 1 },
          { genre: "роман", id: 2 },
        ],
        countries: [{ country: "USa" }],
      })
    );
    // dispatch(moviesActions.loadMovieError(err.message));
  }
};
