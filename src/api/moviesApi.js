import api from "./index";
import { moviesActions } from "../store/reducers/moviesSlice";

export const getListMovies =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch(moviesActions.loadMoviesStart);
      const movies = await api.get(`/films/top/?page=${page}`).then((res) => {
        return res.data;
      });
      dispatch(
        moviesActions.loadMoviesEnd({
          movies: movies.films,
          pagesCount: movies.pagesCount,
        })
      );
    } catch (err) {
      dispatch(moviesActions.loadMoviesError(err.message));
    }
  };
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch(moviesActions.loadMovieStart);
    const movie = await api.get(`/films/${id}`).then((res) => res.data);
    dispatch(moviesActions.loadMovieEnd(movie));
  } catch (err) {
    dispatch(moviesActions.loadMovieError(err.message));
  }
};

export const getListMoviesPage = () => async (dispatch) => {};
