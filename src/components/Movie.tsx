import React from "react";

import classes from "./Movie.module.css";

import { MovieType } from "../Store/Movie.types";

interface IMovieProps {
  movie: MovieType;
}

const Movie: React.FC<IMovieProps> = ({ movie }) => {
  return (
    <li className={classes.movie}>
      <h2>{movie.title}</h2>
      <h3 className={classes["release-date"]}>{movie.releaseDate}</h3>
      <p>{movie.openingText}</p>
    </li>
  );
};

export default Movie;
