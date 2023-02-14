import { MoviePostType } from "../Store/Movie.types";

export const setMovie = async (movie: MoviePostType): Promise<void> => {
  await fetch(
    "https://star-wars-f4c01-default-rtdb.firebaseio.com/movies.json",
    {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
