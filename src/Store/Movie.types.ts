//? Movie for Get Request

export type MovieType = {
  id: string;
  title: string;
  openingText: string;
  releaseDate: string;
};

//? Movie for Post Request

export type MoviePostType = {
  title: string;
  openingText: string;
  releaseDate: string;
};
