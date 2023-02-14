import React, { useState, useRef } from "react";

import classes from "./AddMovie.module.css";
import { MoviePostType } from "../Store/Movie.types";

interface IAddMovie {
  onAddMovie: (movie: MoviePostType) => void;
  onPost: { status: boolean; fetch: boolean };
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
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows={5} id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button disabled={props.onPost.status}>Add Movie</button>
    </form>
  );
};

export default AddMovie;
