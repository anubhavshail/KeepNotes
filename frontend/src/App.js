import React, {useState, useEffect} from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if(token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
