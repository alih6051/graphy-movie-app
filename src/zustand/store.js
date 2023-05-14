import { create } from 'zustand'

const useMovieStore = create((set) => ({
  movies: [],
  isLoading: false,
  addMovies: (data) => set((state) => ({ movies: data})),
  setLoading: (status) => set({ ...status,isLoading:status }),
  resetMovie: () => set((state) => ({...state,movies: []}))
}))

export default useMovieStore;