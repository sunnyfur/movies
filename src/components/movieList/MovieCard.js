import { useNavigate } from "react-router-dom";
import { getColor } from "../../utils/utils";
import styles from "./movieList.module.scss";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleMovieClick = (event) => {
    navigate(`/movies/films/${event.currentTarget.dataset.id}`);
  };

  return (
    <div
      className={styles.movie}
      data-id={movie.filmId}
      onClick={handleMovieClick}
    >
      <img
        alt={movie.nameRu}
        src={movie.posterUrlPreview}
        className={styles.movieImg}
      />
      <div className={styles.movieDescription}>
        <h3>{movie.nameRu}</h3>
        <p>{movie.year}</p>
        <p>{movie.shortDescription}</p>
        <p>{movie.genres.map((genre) => genre.genre).join(", ")}</p>
      </div>
      <span
        className={styles.movieRating}
        style={{ backgroundColor: getColor(movie.rating) }}
      >
        {movie.rating}
      </span>
    </div>
  );
};
export default MovieCard;
