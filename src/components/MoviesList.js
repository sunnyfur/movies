import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListMovies } from "../api/moviesApi";
const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getListMovies());
  }, []);
  const handleClick = () => {};

  return (
    <>
      {movies.map((movie) => (
        <p key={movie.filmId}>{movie.nameRu}</p>
      ))}
      <button onClick={handleClick}>Next</button>
    </>
  );
};
export default MoviesList;
