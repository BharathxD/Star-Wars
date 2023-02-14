import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { MovieType } from "./Store/Movie.types";

function App() {
  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
    {
      id: 3,
      title: "Some Dummy Movie 3",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
    {
      id: 4,
      title: "Some Dummy Movie 3",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];

  const [getMovies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovieHandler = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
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
        <MoviesList movies={getMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
