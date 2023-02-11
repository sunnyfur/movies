import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilmsFilters, getListMovies } from "../../api/moviesApi";
import styles from "./filters.module.scss";

const typeFilt = {
  top: "top",
  words: "words",
  filter: "filter",
};
const typeTop = {
  top: "TOP_250_BEST_FILMS",
  best: "TOP_100_POPULAR_FILMS",
  awaited: "TOP_AWAIT_FILMS",
};
const defaultForm = { search: "", country: "", genre: "" };

const Filters = () => {
  const [typeFilter, setTypeFilter] = useState(typeFilt.top);
  const [typeTopSelect, setTypeTopSelect] = useState(typeTop.top);
  const { filtersAll } = useSelector((state) => state.movies);
  const [formInputs, setFormInputs] = useState(defaultForm);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilmsFilters());
  }, []);
  useEffect(() => {
    dispatch(getListMovies("api/v2.2/films/top", 1, { type: typeTopSelect }));
  }, [typeTopSelect]);
  const handleChange = (e) => {
    setTypeFilter(e.target.dataset.type);
    if (typeFilt.top === e.target.dataset.type)
      dispatch(getListMovies("api/v2.2/films/top", 1, { type: typeTopSelect }));
  };
  const handleChangeTop = (e) => {
    setTypeTopSelect(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeFilter === typeFilt.words)
      dispatch(
        getListMovies("api/v2.1/films/search-by-keyword", 1, {
          keyword: formInputs.search,
        })
      );
    if (typeFilter === typeFilt.filter) {
      const params = {};
      if (formInputs.search) params.keyword = formInputs.search;
      if (formInputs.country) params.country = formInputs.country;
      if (formInputs.genre) params.genre = formInputs.genre;
      dispatch(getListMovies("api/v2.2/films", 1, params));
    }
    setFormInputs({ ...defaultForm });
  };
  const handleChangeForm = (e) => {
    setFormInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <h2>Фильмы</h2>{" "}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Топ
          <input
            className={styles.inputRadio}
            type="radio"
            name="filter"
            checked={typeFilt.top === typeFilter}
            value={typeFilt.top}
            data-type={typeFilt.top}
            onChange={handleChange}
          />
        </label>
        <label>
          По словам
          <input
            className={styles.inputRadio}
            type="radio"
            name="filter"
            checked={typeFilt.words === typeFilter}
            value={typeFilt.words}
            data-type={typeFilt.words}
            onChange={handleChange}
          />
        </label>
        <label>
          По фильтрам
          <input
            className={styles.inputRadio}
            type="radio"
            name="filter"
            checked={typeFilt.filter === typeFilter}
            value={typeFilt.filter}
            data-type={typeFilt.filter}
            onChange={handleChange}
          />
        </label>
        {typeFilter === typeFilt.top ? (
          <>
            <select
              className={styles.select}
              value={typeTopSelect}
              onChange={handleChangeTop}
            >
              <option value={typeTop.top} className={styles.option}>
                Топ 250 лучших фильмов
              </option>
              <option value={typeTop.best} className={styles.option}>
                Топ 100 популярных фильмов
              </option>
              <option value={typeTop.awaited} className={styles.option}>
                Топ ожидаемых фильмов
              </option>
            </select>
          </>
        ) : (
          <>
            <input
              className={styles.input}
              name="search"
              value={formInputs.search}
              onChange={handleChangeForm}
              placeholder="найти..."
            />
            {typeFilt.filter === typeFilter && (
              <>
                <select
                  name="genre"
                  value={formInputs.genre}
                  onChange={handleChangeForm}
                  className={styles.select}
                >
                  <option className={styles.option} value="" disabled>
                    Жанр
                  </option>
                  {filtersAll.genres.map((genre) => (
                    <option
                      className={styles.option}
                      key={genre.id}
                      value={genre.id}
                    >
                      {genre.genre}
                    </option>
                  ))}
                </select>
                <select
                  name="country"
                  value={formInputs.country}
                  onChange={handleChangeForm}
                  className={styles.select}
                >
                  <option className={styles.option} value="" disabled>
                    Страна
                  </option>
                  {filtersAll.countries.map((country) => (
                    <option
                      className={styles.option}
                      key={country.id}
                      value={country.id}
                    >
                      {country.country}
                    </option>
                  ))}
                </select>
              </>
            )}
            <button className={styles.btn}>Найти</button>
          </>
        )}
      </form>
    </>
  );
};
export default Filters;
