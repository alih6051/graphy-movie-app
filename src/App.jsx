import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import Navbar from "./components/Navbar/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movie/:id" element={<Movie/>} />
      </Routes>
    </>
  )
}

export default App