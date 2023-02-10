import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/moviesApi";
import Loader from "../loader/Loader";

const isLoadingMovie = false;
const movies = require("../../mock/films.json");
const movie = movies[0];

const Movie = () => {
  // const params = useParams();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getMovie(params.id));
  // }, [params.id]);

  // const { movie, isLoadingMovie } = useSelector((state) => state.movies);
  if (isLoadingMovie) return <Loader />;
  return <>{movie.nameRu}</>;
};
export default Movie;
