import logo from './logo.svg';
import './App.css';
import { Alert } from 'reactstrap'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Auth from './components/auth/Auth'
import Footer from './components/footer/Footer';
import Display from './components/display/Display';

function App() {

  const [token, setToken] = useState('');
  const [signup, setSignup] = useState(true);
  const [userId, setUserId] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(initializeUser, []);

  function errorHandler(results) {
    if (results.ERROR) {
      setErrorMessage(results.ERROR);
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
        setErrorMessage('');
      }, 3000)
    }
  };
  
  function initializeUser() {
    setToken(localStorage.token);
    console.log("localStorage.token: ", localStorage.token);
    setUserId(localStorage.userId);
    console.log("localStorage.userId: ", localStorage.userId);
  }
  
  function updateUser(newToken, newId) {
    setToken(newToken);
    localStorage.token = newToken;
    setUserId(newId)
    localStorage.userId = newId;
    console.log(localStorage);
  }
  
  function clearUser() {
    setToken('');
    localStorage.removeItem('token');
    setUserId('');
    localStorage.removeItem('userId');
  }
  
  return (
    <div className="text-center min-vh-100 p-0 container-fluid d-flex flex-column align-items-center">
      <BrowserRouter style={{ height: "100%" }}>

        <Navbar token={token} clearUser={clearUser}/>

        {
          errorState === false
          ?
          null
          :
          <Alert color="danger">
            {errorMessage}
          </Alert>
        }

        <Routes>

            <Route path="/" element={<Auth updateUser={updateUser} signup={signup} setSignup={setSignup} setUserId={setUserId} errorHandler={errorHandler} />} />
            <Route path='/display' element={<Display token={token} userId={userId} errorHandler={errorHandler} />} />
        </Routes>
        
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;