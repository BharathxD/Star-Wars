import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { MovieType } from "./Store/Movie.types";
import AddMovie from "./components/AddMovie";

function App() {
  const [getMovies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const fetchMovieHandler = useCallback(async () => {
    try {
      //? Setting movies
      setMovies([]);
      setError(null);
      setLoading(true);
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      const result = data.results;
      result.map((data: any) => {
        const movieData: MovieType = {
          id: data.episode_id,
          title: data.title,
          openingText: data.opening_crawl,
          releaseDate: data.release_date,
        };
        setMovies((prevMovies) => {
          return [...prevMovies, movieData];
        });
      });
    } catch (e) {
      setError((e as DOMException).message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let Content = (
    <h4 className="loading-message">Loading it may take a while...</h4>
  );

  if (error) {
    Content = <h4 className="error-message">{error}</h4>;
  }
  if (!loading && getMovies.length > 0) {
    Content = <MoviesList movies={getMovies} />;
  }
  if (!loading && getMovies.length === 0 && !error) {
    Content = <h4 className="error-message">Found no movies.</h4>;
  }

  const addMovieHandler = (movie: MovieType) => {
    console.log(movie);
  };

  return (
    <div className="container">
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {Content}
      </section>
    </div>
  );
}

export default App;
