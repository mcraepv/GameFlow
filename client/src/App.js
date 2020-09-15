import React, { useEffect } from 'react';
import './App.css';
import './utils/API';

function App() {
  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== process.env.REACT_APP_API_URL) {
        return;
      }
      console.log(event.data);
      const { games, ok } = event.data;
      if (ok) {
        console.log(JSON.parse(games));
      }
    });
  });
  const login = () => {
    const popupWindow = window.open(
      `${process.env.REACT_APP_API_URL}/auth/steam`,
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
