import { useState } from "react";
import { MovieType } from "../Store/Movie.types";

export const getMovies = async (): Promise<MovieType[]> => {
  const response: Response = await fetch(
    "https://star-wars-f4c01-default-rtdb.firebaseio.com/movies.json"
  );
  if (!response.ok) throw new Error("Something went Wrong");
  const data: MovieType[] = await response.json();
  let loadedMovies: MovieType[] = Object.entries(data).map(
    ([id, { title, openingText, releaseDate }]) => ({
      id,
      title,
      openingText,
      releaseDate,
    })
  );
  return loadedMovies;
};
