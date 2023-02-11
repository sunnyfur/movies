import api from "./index";
import { moviesActions } from "../store/reducers/moviesSlice";

const combineStr = (path, params, page) => {
  const paramsStr = Object.keys(params).length
    ? `${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&")}&`
    : "";
  return path + `?${paramsStr}page=${page}`;
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

      const films = "films" in movies ? movies.films : movies.items;
      const pages =
        "pagesCount" in movies ? movies.pagesCount : movies.totalPages;

      dispatch(
        moviesActions.loadMoviesEnd({
          path: path,
          movies: films,
          pagesCount: pages,
          pathParams: params,
          currPage: page,
        })
      );
    } catch (err) {
      dispatch(moviesActions.loadMoviesError(err.message));
    } finally {
      dispatch(refreshHeader());
    }
  };
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch(moviesActions.loadMovieStart);
    const movie = await api.get(`api/v2.2/films/${id}`).then((res) => res.data);
    dispatch(moviesActions.loadMovieEnd(movie));
  } catch (err) {
    dispatch(moviesActions.loadMovieError(err.message));
  }
};

export const getFilmsFilters = () => async (dispatch) => {
  try {
    const filters = await api
      .get(`api/v2.2/films/filters`)
      .then((res) => res.data);
    dispatch(moviesActions.loadFiltersAll(filters));
  } catch (err) {
    dispatch(moviesActions.loadMovieError(err.message));
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
