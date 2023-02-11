import api from "./index";
import { moviesActions } from "../store/reducers/moviesSlice";

const moviesArr = require("../mock/films.json");
const movieSample = require("../mock/film.json");
const genresSample = require("../mock/genres.json");
const combineStr = (path, params, page) => {
  const paramsStr = Object.keys(params).length
    ? `${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&")}&`
    : "";
  return path + `/?${paramsStr}page=${page}`;
};

export const getListMovies =
  (path, page = 1, params) =>
  async (dispatch) => {
    let pathStr = combineStr(path, params, page);

    try {
      dispatch(moviesActions.loadMoviesStart);
      const movies = await api.get(`${pathStr}`).then((res) => {
        return res.data;
      });
      dispatch(
        moviesActions.loadMoviesEnd({
          path: path,
          movies: movies.films,
          pagesCount: movies.pagesCount,
          pathParams: params,
          currPage: page,
        })
      );
    } catch (err) {
      // dispatch(moviesActions.loadMoviesError(err.message));
      console.log(pathStr);
      dispatch(
        moviesActions.loadMoviesEnd({
          movies: moviesArr.films,
          pagesCount: moviesArr.pagesCount,
          currPage: page,
          pathParams: params,
          path: path,
        })
      );
    } finally {
      dispatch(refreshHeader());
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

export const getFilmsFilters = () => async (dispatch) => {
  try {
    const filters = await api.get(`/films/filters`).then((res) => res.data);
    dispatch(moviesActions.loadFiltersAll(filters));
  } catch (err) {
    dispatch(moviesActions.loadFiltersAll(genresSample));
    // dispatch(moviesActions.loadMovieError(err.message));
  }
};

export const nextPage = () => async (dispatch, getState) => {
  const state = getState().movies;
  dispatch(getListMovies(state.path, state.currPage + 1, state.pathParams));
};
export const prevPage = () => async (dispatch, getState) => {
  const state = getState().movies;
  dispatch(getListMovies(state.path, state.currPage - 1, state.pathParams));
};

export const refreshHeader = () => async (dispatch, getState) => {
  const state = getState().movies;
  console.log(state.pathParams);
  switch (state.pathParams.type) {
    case "TOP_250_BEST_FILMS":
      dispatch(moviesActions.setHeader("Топ 250 лучших фильмов"));
      break;
    case "TOP_100_POPULAR_FILMS":
      dispatch(moviesActions.setHeader("Топ 100 популярных фильмов"));
      break;
    case "TOP_AWAIT_FILMS":
      dispatch(moviesActions.setHeader("Топ ожидаемых фильмов"));
      break;
    default:
      dispatch(moviesActions.setHeader("Список фильмов"));
  }
};
