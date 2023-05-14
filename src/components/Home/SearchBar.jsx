import React, { useEffect, useState } from "react";
import useMovieStore from "../../zustand/store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../Pagination";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [params, setParams] = useState({
    s: "",
    page: 1,
    apikey: import.meta.env.VITE_API_KEY,
  });
  const [totalPage,setTotalPage] = useState(null)

  const { movies, addMovies, isLoading, setLoading, resetMovie } = useMovieStore(
    (state) => ({
      movies: state.movies,
      addMovies: state.addMovies,
      isLoading: state.isLoading,
      setLoading: state.setLoading,
      resetMovie: state.resetMovie
    })
  );

  useEffect(() => {
    if (params.s === "") return;
    setLoading(true);
    axios
      .get(`http://www.omdbapi.com`, { params: params })
      .then((res) => {
        setLoading(false);
        if (res.data.Error) return toast(res.data.Error);
        setTotalPage(Math.ceil(res.data.totalResults/10));
        addMovies(res.data.Search);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast("Something went wrong")
      });
      return ()=>resetMovie();
  }, [params]);

  const handleSearch = (e) => {
    e.preventDefault();
    setParams({ ...params, s: search });
  };

  return (
    <div className="px-3 max-w-7xl mx-auto">
      <div className="bg-gray-700 my-5 rounded-lg p-5 md:p-10 flex flex-col gap-3">
        <div className="text-center text-xl">Search For Any Movie</div>
        <div>
          <form className="flex items-center" onSubmit={handleSearch}>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                placeholder="Search Movie..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {totalPage && <Pagination params={params} setParams={setParams} totalPage={totalPage} />}
    </div>
  );
}

export default SearchBar;
