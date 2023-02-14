import React, { useState, useRef } from "react";

import classes from "./AddMovie.module.css";
import { MoviePostType } from "../Store/Movie.types";

interface IAddMovie {
  onAddMovie: (movie: MoviePostType) => void;
  fetchMovieHandler: () => void;
}

const AddMovie: React.FC<IAddMovie> = (props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const openingTextRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);
  const [Status, setStatus] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(true);
    const movie = {
      title: titleRef.current!.value,
      openingText: openingTextRef.current!.value,
      releaseDate: releaseDateRef.current!.value,
    };
    await props.onAddMovie(movie);
    setStatus(false);
    titleRef.current!.value = "";
    openingTextRef.current!.value = "";
    releaseDateRef.current!.value = "";
  };

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
      <button type="submit" disabled={Status}>
        Add Movie
      </button>
      <button className={classes.fetch} onClick={props.fetchMovieHandler}>
        Fetch Movies
      </button>
    </form>
  );
};

export default AddMovie;
