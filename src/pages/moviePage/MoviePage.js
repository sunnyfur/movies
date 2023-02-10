import { Link } from "react-router-dom";
import Movie from "../../components/movie/Movie";

const MoviePage = () => {
  return (
    <>
      <Link to={`/`}>На главную</Link>
      <Movie />
    </>
  );
};
export default MoviePage;
