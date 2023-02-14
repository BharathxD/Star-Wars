import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";
import { MovieType } from "../Store/Movie.types";

interface IMovieListProp {
  movies: MovieType[];
}

const MoviesList: React.FC<IMovieListProp> = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
