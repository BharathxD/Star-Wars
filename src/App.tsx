import React, { SetStateAction, useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { MoviePostType, MovieType } from "./Store/Movie.types";
import AddMovie from "./components/AddMovie";

function App() {
  const [getMovies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPost, setLoadingPost] = useState({
    status: false,
    fetch: false,
  });
  const [error, setError] = useState<null | string>(null);

  const fetchMovieHandler = useCallback(async () => {
    try {
      //? Setting movies
      setMovies([]);
      setError(null);
      setLoading(true);
      const response = await fetch(
        "https://star-wars-f4c01-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      let loadedMovies: MovieType[] = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
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

  const addMovieHandler = async (movie: MoviePostType) => {
    setLoadingPost({ status: true, fetch: false });
    const response = await fetch(
      "https://star-wars-f4c01-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setLoadingPost({ status: false, fetch: true });
    console.log(data);
  };

  return (
    <div className="container">
      <section>
        <AddMovie
          fetchMovieHandler={fetchMovieHandler}
          onAddMovie={addMovieHandler}
          onPost={loadingPost}
        />
      </section>
      <section>{Content}</section>
    </div>
  );
}

export default App;
