import React from "react";

import classes from "./Movie.module.css";

import { MovieType } from "../Store/Movie.types";

interface IMovie {
  movie: MovieType;
}

const Movie: React.FC<IMovie> = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.movie.title}</h2>
      <h3 className={classes["release-date"]}>{props.movie.releaseDate}</h3>
      <p>{props.movie.openingText}</p>
    </li>
  );
};

export default Movie;
