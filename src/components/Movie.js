import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie } from "../api/moviesApi";
import Loader from "./Loader";

const Movie = () => {
  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => dispatch(getMovie(params.id)), []);
  const { movie, isLoadingMovie } = useSelector((state) => state.movies);
  if (isLoadingMovie) return <Loader />;
  return <>{movie.nameRu}</>;
};
export default Movie;
