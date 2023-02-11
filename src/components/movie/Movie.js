import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/moviesApi";
import Loader from "../loader/Loader";
import styles from "./movie.module.scss";

const Movie = () => {
  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovie(params.id));
  }, [params.id]);

  const { movie, isLoadingMovie } = useSelector((state) => state.movies);
  if (isLoadingMovie) return <Loader />;
  return (
    <article className={styles.movie}>
      <img className={styles.movieImg} src={movie.posterUrl} alt={`poster`} />
      <div className={styles.movieAbout}>
        <h2>{movie.nameRu}</h2>
        <p>{movie.nameOriginal}</p>
        <span></span>
        <p>{movie.length}</p>
        <p>{movie.year}</p>
        <p>{movie.countries.map((country) => country.country).join(" • ")}</p>
        <p>{movie.genres.map((genre) => genre.genre).join(" • ")}</p>
        <p>{movie.shortDescription}</p>
        <p>{movie.description}</p>
      </div>
    </article>
  );
};
export default Movie;
