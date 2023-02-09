import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import MoviesList from "./components/MoviesList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MoviesList />} />
        <Route path="/films/:id" element={<Movie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
