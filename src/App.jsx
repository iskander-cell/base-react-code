import { useState } from 'react'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editId, setEditId] = useState(null)

  const handleAction = () => {
    if (inputValue.trim() === '') return

    if (editId) {
      setMovies(movies.map(movie =>
        movie.id === editId ? { ...movie, name: inputValue } : movie
      ))
      setEditId(null)
    } else {
      setMovies([
        ...movies,
        {
          id: Date.now(),
          name: inputValue,
          watched: false,
          reaction: null
        }
      ])
    }

    setInputValue('')
  }

  const startEdit = (movie) => {
    setInputValue(movie.name)
    setEditId(movie.id)
  }

  const toggleWatched = (id) => {
    setMovies(movies.map(movie =>
      movie.id === id
        ? { ...movie, watched: !movie.watched, reaction: null }
        : movie
    ))
  }

  return (
    <div className="container">
      <div className="browser-mockup">

        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleAction}>
            {editId ? 'Edit' : 'Add'}
          </button>
        </div>

        <ul className="movie-list">
          {movies.map(movie => (
            <li key={movie.id} className="movie-item">
              <span>
                {movie.name}
                {movie.watched && ' ✔'}
              </span>

              <div className="btn-group">
                <button onClick={() => toggleWatched(movie.id)}>
                  {movie.watched ? 'Unwatch' : 'Watched'}
                </button>

                <button onClick={() => startEdit(movie)}>Edit</button>
                <button onClick={() =>
                  setMovies(movies.filter(m => m.id !== movie.id))
                }>
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default App