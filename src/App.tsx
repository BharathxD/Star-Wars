import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { MovieType } from "./Store/Movie.types";

function App() {
  const [getMovies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovieHandler = async () => {
    try {
      //? Setting movies
      setMovies([]);
      setLoading(true);
      const response = await fetch("https://swapi.dev/api/films/");
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
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section className="movies-section">
        {loading && <h4>Loading it may take a while...</h4>}
        {!loading && getMovies.length > 0 && <MoviesList movies={getMovies} />}
        {!loading && getMovies.length === 0 && <h4>Found no movies.</h4>}
      </section>
    </React.Fragment>
  );
}

export default App;
