import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListMovies } from "../api/moviesApi";
import Loader from "./Loader";
const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, isLoadingMovies } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getListMovies());
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {};
  const handleMovieClick = (event) => {
    // console.log(event.currentTarget.dataset.id);
    navigate(`/films/${event.currentTarget.dataset.id}`);
  };
  if (isLoadingMovies) return <Loader />;
  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.filmId}
          data-id={movie.filmId}
          onClick={handleMovieClick}
        >
          <p>{movie.filmId}</p>
          <p>{movie.nameRu}</p>
        </div>
      ))}
      <button onClick={handleClick}>Next</button>
    </>
  );
};
export default MoviesList;
