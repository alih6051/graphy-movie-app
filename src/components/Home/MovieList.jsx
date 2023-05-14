import React from "react";
import useMovieStore from "../../zustand/store";
import MovieItem from "./MovieItem";
import Loader from "../Loader";

function MovieList() {
  const { movies, addMovies, isLoading, setLoading } = useMovieStore(
    (state) => ({
      movies: state.movies,
      addMovies: state.addMovies,
      isLoading: state.isLoading,
      setLoading: state.setLoading,
    })
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto p-3 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {movies?.map((item) => (
          <MovieItem key={item.imdbID} {...item} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
