import React, {useState, useEffect} from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { BaseStyles, Box, Button, ThemeProvider } from '@primer/react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshNotes, setRefreshNotes] = useState(0);

  useEffect(() => {
    if(token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleNotAdded = () => {
    setRefreshNotes(prev => prev + 1);
  }

  const handleLogout = () => {
    setToken(null);
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
                  token? (
                    <>
                      <NoteForm token={token} onNoteAdded={handleNotAdded} />
                      <NoteList token={token} refreshTrigger={refreshNotes}/>
                      <button onClick={handleLogout}>Logout</button>
                    </>
                  ) : (
                    <>
                    <Login setToken={setToken}/>
                    <Button block sx={{
                      width: '400px',
                      mx: 'auto',
                      mt: 3
                      }}><Link to="/register" style={{ textDecoration: 'none', color: 'inherit'}}>Register</Link>
                    </Button>
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
