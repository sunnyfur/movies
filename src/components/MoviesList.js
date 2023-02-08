import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListMovies } from "../api/moviesApi";
export const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getListMovies());
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <p key={movie.filmId}>{movie.nameRu}</p>
      ))}
    </div>
  );
};
