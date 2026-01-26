import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="container">
      <div className="browser-mockup">
        <h1>A Web Page</h1>
        <div className="input-group">
          <input type="text" placeholder="Movie name..." />
          <button>Add</button>
        </div>
        <h3>To watch list:</h3>
        <ul className="movie-list">
          {}
        </ul>
      </div>
    </div>
  )
}
export default App