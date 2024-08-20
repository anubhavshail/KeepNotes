import React, {useState, useEffect} from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { BaseStyles, Box, ThemeProvider } from '@primer/react';
import Nheader from './components/Nheader';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshNotes, setRefreshNotes] = useState(0);
  const [isValidToken, setValidToken] = useState(false)

  const validateToken = async (token) => {
    try {
      const res = await axios.get('http://localhost:3000/api/validateToken', { headers: { Authorization: `Bearer ${token}`}});
      return res.data.valid;
    } catch (err) {
      console.error('Token validation failed', err)
      return false;
    }
  }
  
  useEffect(() => {
    const checkToken = async () => {
      if(token) {
        const isValid =  await validateToken(token);
        if (isValid) {
          setValidToken(true);
          localStorage.setItem('token', token)
        } else {
          setValidToken(false);
          localStorage.removeItem('token');
        }
      } else {
        setValidToken(false)
        localStorage.removeItem('token');
      }
    };
    checkToken();
  }, [token]);

  const handleNotAdded = () => {
    setRefreshNotes(prev => prev + 1);
  }

  return (
    <Router>
      <ThemeProvider colorMode='auto'>
        <BaseStyles>
          <Box bg='canvas.default' minHeight='100vh'>
            <Routes>
                <Route path='/' element={ <Navigate to='/notes' />}/>
                <Route path='/register' element={<Register setToken={setToken}/>} />
                <Route path='/login' element={<Login setToken={setToken}/>} />
                <Route path='/notes' element={
                  isValidToken? (
                    <>
                      <Nheader token={token} setToken={setToken} />
                      <NoteForm token={token} onNoteAdded={handleNotAdded} />
                      <NoteList token={token} refreshTrigger={refreshNotes}/>
                    </>
                  ) : (
                    <>
                    <Login setToken={setToken}/>
                    </>
                  )
                } />
              </Routes>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </Router>
    
  );
}
export default App;
