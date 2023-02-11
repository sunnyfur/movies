import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilmsFilters } from "../../api/moviesApi";
import styles from "./filters.module.scss";

const Filters = () => {
  const { filtersAll } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilmsFilters());
  }, []);

  return (
    <>
      <h2>Поиск</h2>{" "}
      <form className={styles.form}>
        <select className={styles.select}>
          <option value="words">По словам</option>
          <option value="actors">По актерам</option>
        </select>
        <input className={styles.input} placeholder="найти..." />
        <select className={styles.select}>
          <option className={styles.option} selected disabled>
            Жанр
          </option>
          {filtersAll.genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genre}
            </option>
          ))}
        </select>
        <select className={styles.select}>
          <option selected disabled>
            Страна
          </option>
          {filtersAll.countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country}
            </option>
          ))}
        </select>

        <button className={styles.btn}>Найти</button>
      </form>
    </>
  );
};
export default Filters;
