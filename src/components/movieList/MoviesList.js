import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListMovies, nextPage, prevPage } from "../../api/moviesApi";
import ErrorComponent from "../error/ErrorComponent";
import Loader from "../loader/Loader";

import MovieCard from "./MovieCard";
import styles from "./movieList.module.scss";

const MoviesList = () => {
  const { isLoadingMovies, movies, header, serverError, currPage, pagesCount } =
    useSelector((state) => state.movies);
  const [disPrev, setDisPrev] = useState(true);
  const [disNext, setDisNext] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currPage < pagesCount) {
      setDisNext(false);
    } else {
      setDisNext(true);
    }
    if (currPage > 1) {
      setDisPrev(false);
    } else {
      setDisPrev(true);
    }
  }, [currPage, pagesCount]);

  const handleClickNext = () => {
    dispatch(nextPage());
  };
  const handleClickPrev = () => {
    dispatch(prevPage());
  };

  if (isLoadingMovies) return <Loader />;
  if (serverError) return <ErrorComponent message={serverError} />;
  return (
    <>
      <h2>{header}</h2>
      <div className={styles.movies}>
        {movies.map((movie) => (
          <MovieCard key={movie.filmId} movie={movie} />
        ))}
      </div>
      {pagesCount > 0 && (
        <div className={styles.btnsBlock}>
          <button
            disabled={disPrev}
            className={styles.btn}
            onClick={handleClickPrev}
          >
            <div className={styles.arrowLeft} />
          </button>
          <p>
            {currPage} из {pagesCount}
          </p>
          <button
            disabled={disNext}
            className={styles.btn}
            onClick={handleClickNext}
          >
            <div className={styles.arrowRight} />
          </button>
        </div>
      )}
    </>
  );
};
export default MoviesList;
