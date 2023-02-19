import React, { useState, useRef } from "react";

import classes from "./AddMovie.module.css";
import { MoviePostType } from "../Store/Movie.types";

interface IAddMovie {
  onAddMovie: (movie: MoviePostType) => Promise<boolean>;
  fetchMovieHandler: () => void;
}

const AddMovie: React.FC<IAddMovie> = ({ onAddMovie, fetchMovieHandler }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const openingTextRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);
  const [Status, setStatus] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus(true);
    const movie: MoviePostType = {
      title: titleRef.current!.value,
      openingText: openingTextRef.current!.value,
      releaseDate: releaseDateRef.current!.value,
    };
    const result: boolean = await onAddMovie(movie);
    setStatus(!result);
    setTimeout(() => setStatus(false), 5000);
    titleRef.current!.value = "";
    openingTextRef.current!.value = "";
    releaseDateRef.current!.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <input
          type="text"
          placeholder="Title"
          id="title"
          ref={titleRef}
          required
        />
      </div>
      <div className={classes.control}>
        <textarea
          rows={5}
          id="opening-text"
          placeholder="Opening Text"
          ref={openingTextRef}
          required
        ></textarea>
      </div>
      <div className={classes.control}>
        <input
          type="text"
          id="date"
          placeholder="Release Date"
          ref={releaseDateRef}
          required
        />
      </div>
      <button type="submit" disabled={Status}>
        {Status && "Failed to Post"}
        {!Status && "Add Movie"}
      </button>
      <button
        type="button"
        className={classes.fetch}
        onClick={fetchMovieHandler}
      >
        Fetch Movies
      </button>
    </form>
  );
};

export default AddMovie;
