import { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { MoviePostType, MovieType } from "./Store/Movie.types";
import AddMovie from "./components/AddMovie";
import { setMovie } from "./hooks/setMovie";
import { getMovies } from "./hooks/getMovie";

function App() {
  const [getMovieData, setMovieData] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const fetchMovieHandler = useCallback(async (): Promise<void> => {
    try {
      //? Initializing states
      setMovieData([]);
      setError(null);
      setLoading(true);
      let data = await getMovies();
      setMovieData(data);
    } catch (e) {
      setError((e as DOMException).message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let Content: JSX.Element = (
    <h4 className="loading-message">Loading it may take a while...</h4>
  );

  if (error) {
    Content = <h4 className="error-message">{error}</h4>;
  }
  if (!loading && getMovieData.length > 0) {
    Content = <MoviesList movies={getMovieData} />;
  }
  if (!loading && getMovieData.length === 0 && !error) {
    Content = <h4 className="error-message">Found no movies.</h4>;
  }
  return (
    <div className="container">
      <section>
        <AddMovie
          fetchMovieHandler={fetchMovieHandler}
          onAddMovie={setMovie}
        />
      </section>
      <section>{Content}</section>
    </div>
  );
}

export default App;
