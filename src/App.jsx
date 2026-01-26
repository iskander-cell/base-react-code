import { useState } from 'react'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addMovie = () => {
    if (inputValue.trim() === '') return;
    // Создаем новый массив через копирование
    setMovies([...movies, { id: Date.now(), name: inputValue }]);
    setInputValue('');
  };

  const deleteMovie = (id) => {
    // Удаляем через фильтрацию (создает новый массив)
    setMovies(movies.filter(m => m.id !== id));
  };

  return (
    <div className="container">
      <div className="browser-mockup">
        <div className="input-group">
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <button onClick={addMovie}>Add</button>
        </div>
        <h3>To watch list:</h3>
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <span>{movie.name}</span>
              <button onClick={() => deleteMovie(movie.id)} className="delete-btn">✖</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default App