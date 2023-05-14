import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

function Movie() {
  let { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://www.omdbapi.com/?i=${id}&apikey=${import.meta.env.VITE_API_KEY}`
      )
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast("Something went wrong");
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-3 max-w-3xl mx-auto">
      <div className="bg-gray-700 rounded overflow-hidden shadow-lg">
        <img className="w-full" src={movie?.Poster} alt={movie?.Title}  />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{movie?.Title} ({movie?.Year})</div>
          <p className="text-base">{movie.Plot}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{movie?.Type}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
