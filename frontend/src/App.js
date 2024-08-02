import React, {useState, useEffect} from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if(token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  }

  return (
    <Router>
      <div>
        <nav>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </nav>

        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setToken={setToken}/>} />
          <Route path='/notes' element={
            token? (
              <>
                <NoteForm token={token} onNoteAdded={() => {}} />
                <NoteList token={token}/>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <p>Please login to view your notes.</p>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
