import React, { useState, useRef } from "react";

import classes from "./AddMovie.module.css";
import { MoviePostType } from "../Store/Movie.types";

interface IAddMovie {
  onAddMovie: (movie: MoviePostType) => void;
  onPost: { status: boolean; fetch: boolean };
  fetchMovieHandler: () => void;
}

const AddMovie: React.FC<IAddMovie> = (props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const openingTextRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const movie = {
      title: titleRef.current!.value,
      openingText: openingTextRef.current!.value,
      releaseDate: releaseDateRef.current!.value,
    };
    props.onAddMovie(movie);
    titleRef.current!.value = "";
    openingTextRef.current!.value = "";
    releaseDateRef.current!.value = "";
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} required />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          rows={5}
          id="opening-text"
          ref={openingTextRef}
          required
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} required />
      </div>
      <button type="submit" disabled={props.onPost.status}>
        Add Movie
      </button>
      <button className={classes.fetch} onClick={props.fetchMovieHandler}>
        Fetch Movies
      </button>
    </form>
  );
};

export default AddMovie;
