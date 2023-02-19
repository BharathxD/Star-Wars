import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";
import { MovieType } from "../Store/Movie.types";

interface IMovieListProps {
  movies: MovieType[];
}

const MoviesList: React.FC<IMovieListProps> = ({ movies }) => {
  return (
    <ul className={classes["movies-list"]}>
      {movies.map((movie: MovieType) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};

export default MoviesList;
