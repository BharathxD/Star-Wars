import React, { useState, useEffect, useCallback } from "react";
import { MovieType } from "../Store/Movie.types";
import { getMovies } from "./getMovie";

interface IRequestConfig {
  url: URL;
  method: string;
  headers: HeadersInit | undefined;
  body: string;
}

export const useHTTP = (
  requestConfig: IRequestConfig,
  applyData: (data: MovieType[]) => void
) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const sendRequest = useCallback(async (): Promise<void> => {
    try {
      //? Initializing states
      setError(null);
      setLoading(true);
      const response: Response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      });
      if (!response.ok) throw new Error("Something went Wrong");
      const data: MovieType[] = await response.json();
      applyData(data);
      //   let loadedMovies: MovieType[] = [];
      //   for (const key in data) {
      //     loadedMovies.push({
      //       id: key,
      //       title: data[key].title,
      //       openingText: data[key].openingText,
      //       releaseDate: data[key].releaseDate,
      //     });
      //   }
    } catch (e) {
      setError((e as DOMException).message);
    }
    setLoading(false);
  }, []);
  return { isLoading, error, sendRequest };
};
