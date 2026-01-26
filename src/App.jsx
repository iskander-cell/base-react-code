import { useState } from 'react'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null); // Состояние для редактирования

  const handleAction = () => {
    if (inputValue.trim() === '') return;

    if (editId) {
      // Обновляем через .map (создаем новый массив)
      setMovies(movies.map(m => m.id === editId ? { ...m, name: inputValue } : m));
      setEditId(null);
    } else {
      setMovies([...movies, { id: Date.now(), name: inputValue }]);
    }
    setInputValue('');
  };

  const startEdit = (movie) => {
    setInputValue(movie.name); // Данные улетают в инпут
    setEditId(movie.id);
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
          {/* Кнопка меняется на Edit */}
          <button onClick={handleAction}>{editId ? 'Edit' : 'Add'}</button>
        </div>
        <h3>To watch list:</h3>
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <span>{movie.name}</span>
              <div className="btn-group">
                <button onClick={() => startEdit(movie)}>Edit</button>
                <button onClick={() => setMovies(movies.filter(m => m.id !== movie.id))}>✖</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default App