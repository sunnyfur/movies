import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../components/notFound/NotFound";
import MainPage from "../pages/mainPage/MainPage";
import MoviePage from "../pages/moviePage/MoviePage";
import styles from "./app.module.scss";
import "./index.scss";

function App() {
  return (
    <main className={styles.container}>
      <div className={styles.containerContent}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<MainPage />} />
            <Route path="/films/:id" element={<MoviePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
