import React from 'react';
import './App.css';
import './utils/API';
import API from './utils/API';

function App() {
  const login = () => {
    const popupWindow = window.open(
      'http://localhost:3001/auth/steam',
      '_blank',
      'width=800, height=600'
    );
    if (window.focus) popupWindow.focus();
  };

  return (
    <div className="App">
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
