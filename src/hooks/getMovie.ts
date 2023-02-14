import { useState } from "react";
import { MovieType } from "../Store/Movie.types";

export const getMovies = async (): Promise<MovieType[]> => {
  const response = await fetch(
    "https://star-wars-f4c01-default-rtdb.firebaseio.com/movies.json"
  );
  if (!response.ok) throw new Error("Something went Wrong");
  const data: MovieType[] = await response.json();
  let loadedMovies: MovieType[] = [];
  for (const key in data) {
    loadedMovies.push({
      id: key,
      title: data[key].title,
      openingText: data[key].openingText,
      releaseDate: data[key].releaseDate,
    });
  }
  return loadedMovies;
};
