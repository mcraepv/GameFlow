import React, { useEffect, useState } from 'react';
import './utils/API';
import { Grommet, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from './components/AppBar';
// import MyCard from './components/MyCard';
import Landing from './pages/Landing';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import GamesContext from './utils/GamesContext';
import Quiz from './pages/Quiz';

const theme = {
  global: {
    colors: {
      darkPurp: '#B64FC8',
      lightPurp: '#FFB2FF',
      background: '#202124',
      card: '#3C4042',
      primary: '#0e0f10',
      lightGray: '#A0A4A9',
      focus: '#FFB2FF',
    },
    font: {
      family: 'Ubuntu',
      size: '18px',
      height: '20px',
    },
    image: {
      extend: {
        borderRadius: '25px',
      },
    },
  },
};

function App() {
  const [gamesState, setGamesState] = useState({
    games: [],
  });

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== process.env.REACT_APP_API_URL) {
        return;
      }
      const { games, ok } = event.data;
      if (ok) {
        setGamesState({
          games: JSON.parse(games),
        });
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
    <Router>
      <Grommet theme={theme} full>
        <AppBar margin={{ bottom: 'large' }}>
          <Heading level="3" margin="none" color="lightPurp">
            GameFlow
          </Heading>
          <Button
            icon={<Notification color="lightPurp" />}
            onClick={() => {}}
          />
        </AppBar>
        <GamesContext.Provider value={gamesState}>
          <Switch>
            <Route exact path="/">
              {gamesState.games.length ? (
                <Redirect to="/quiz" />
              ) : (
                <Landing login={login} />
              )}
            </Route>
            <Route exact path="/quiz" component={Quiz} />
          </Switch>
        </GamesContext.Provider>
      </Grommet>
    </Router>
  );
}

export default App;

//color palette
//#202124 - blackish - background
//#FFB2FF - light purple
// #EA80FC - mid purple
//#B64FC8 - dark purple
// #606368 - light gray - drop shadow
//#3C4042 - dark gray
//#A0A4A9 - off white - text

{
  /*<Box
  flex
  align="center"
  direction="row"
  justify="center"
  background="background"
  >
  <MyCard />
  <MyCard />
  <MyCard />
</Box>  */
}
