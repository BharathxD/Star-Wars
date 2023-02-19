import React from "react";

import classes from "./Movie.module.css";

interface IMovieProps {
  title: string;
  releaseDate: string;
  openingText: string;
}

const Movie: React.FC<IMovieProps> = ({ title, releaseDate, openingText }) => {
  return (
    <li className={classes.movie}>
      <h2>{title}</h2>
      <h3 className={classes["release-date"]}>{releaseDate}</h3>
      <p>{openingText}</p>
    </li>
  );
};

export default Movie;
