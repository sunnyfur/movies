import { Link } from "react-router-dom";
import Movie from "../../components/movie/Movie";
import styles from "./moviePage.module.scss";

const MoviePage = () => {
  return (
    <section className={styles.moviePage}>
      <Link to={`/movies`}>На главную</Link>
      <Movie />
    </section>
  );
};
export default MoviePage;
