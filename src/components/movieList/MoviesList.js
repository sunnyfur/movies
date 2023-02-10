import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import MovieCard from "./MovieCard";
import styles from "./movieList.module.scss";

const moviesArr = require("../../mock/films.json");

const MoviesList = () => {
  // const dispatch = useDispatch();
  const { isLoadingMovies, header, serverError } = useSelector(
    (state) => state.movies
  );
  const [movies, setMovies] = useState(moviesArr);

  // useEffect(() => {
  //   dispatch(getListMovies());
  // }, [movies]);

  const handleClick = () => {};

  // if (isLoadingMovies) return <Loader />;
  // if (serverError) return <ErrorComponent message={serverError} />;
  return (
    <>
      <h1>{header}</h1>
      <div className={styles.movies}>
        {movies.map((movie) => (
          <MovieCard key={movie.filmId} movie={movie} />
        ))}
      </div>
      <button onClick={handleClick}>Next</button>
    </>
  );
};
export default MoviesList;
