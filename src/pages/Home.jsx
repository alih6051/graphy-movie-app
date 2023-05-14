import React from 'react'
import SearchBar from '../components/Home/SearchBar'
import MovieList from '../components/Home/MovieList'

function Home() {
  return (
    <div>
        {/* Search Bar */}
        <SearchBar />

        {/* Movie List */}
        <MovieList />
    </div>
  )
}

export default Home