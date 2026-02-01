import { useState } from 'react'
import './App.css'
import LikeDislike from './LikeDislike'

function App() {
  const [movies, setMovies] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editId, setEditId] = useState(null)
  const [showWatched, setShowWatched] = useState(false)
   
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

  const setReaction = (id, value) => {
    setMovies(movies.map(movie =>
      movie.id === id ? { ...movie, reaction: value } : movie
    ))
  }

  const filteredMovies = movies.filter(movie =>
    showWatched ? movie.watched : !movie.watched
  )

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
            {editId ? 'Редактировать' : 'Добавить'}
          </button>
        </div>

        <button
          onClick={() => setShowWatched(!showWatched)}
          style={{ marginBottom: '15px' }}
        >
          {showWatched
            ? 'Показать ещё не просмотренные'
            : 'Показать просмотренные'}
        </button>

        <ul className="movie-list">
          {filteredMovies.map(movie => (
            <li key={movie.id} className="movie-item">
              <span>
                {movie.name}
                {movie.watched && ' ✔'}
              </span>

              <div className="btn-group">
                <button onClick={() => toggleWatched(movie.id)}>
                  {movie.watched ? 'Не просмотрено' : 'Просмотрено'}
                </button>

                {movie.watched && (
                  <LikeDislike
                    reaction={movie.reaction}
                    onLike={() => setReaction(movie.id, 'like')}
                    onDislike={() => setReaction(movie.id, 'dislike')}
                  />
                )}

                <button onClick={() => startEdit(movie)}>Редактировать</button>
                <button onClick={() =>
                  setMovies(movies.filter(m => m.id !== movie.id))
                }>
                  Удалить
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