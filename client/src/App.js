import React, { useEffect, useState } from 'react';
import './utils/API';
import { Grommet, Button, Heading, Anchor, Box } from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from './components/AppBar';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Recommendation from './pages/Recommendation';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import theme from './utils/theme';

function App() {
  const [gamesState, setGamesState] = useState({
    games: [],
  });
  const [tagsArrState, setTagsArrState] = useState([]);

  useEffect(() => {
    const games = localStorage.getItem('games');
    if (games) {
      setGamesState({
        games: JSON.parse(games),
      });
    }
    window.addEventListener('message', (event) => {
      if (!event.data.gamesRes) {
        return;
      }
      const { games, ok } = event.data;
      if (ok) {
        setGamesState({
          games: JSON.parse(games),
        });
        localStorage.setItem('games', games);
      }
    });
  }, []);
  const login = () => {
    const path = process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/auth/steam`
      : '/auth/steam';
    const popupWindow = window.open(path, '_blank', 'width=800, height=600');
    if (window.focus) popupWindow.focus();
  };

  const updateTags = (tagsArr) => {
    setTagsArrState(tagsArr);
  };

  const resetQuiz = () => {
    setTagsArrState([]);
  };

  const addToFavorites = (title) => {
    console.log(`${title} was added to favorites!`);
  };

  return (
    <Router>
      <Grommet theme={theme} full>
        <AppBar margin={{ bottom: 'large' }}>
          <Anchor href="/">
            <Heading level="3" margin="none" color="lightPurp">
              GameFlow
            </Heading>
          </Anchor>
          {gamesState.games.length ? (
            <Box direction="row">
              <Button
                label="Favorites"
                hoverIndicator
                alignSelf="end"
                margin={{ right: 'xsmall' }}
              />
              <Button
                label="Log Out"
                primary
                hoverIndicator
                onClick={() => {
                  localStorage.removeItem('games');
                  setGamesState({
                    games: [],
                  });
                }}
              />
            </Box>
          ) : (
            <Button label="Log In" primary hoverIndicator onClick={login} />
          )}
        </AppBar>
        <Switch>
          <Route exact path="/">
            {gamesState.games.length && !tagsArrState.length ? (
              <Redirect to="/quiz" />
            ) : (
              <Landing login={login} />
            )}
          </Route>
          <Route exact path="/quiz">
            {tagsArrState.length ? (
              <Redirect to="/recommendation" />
            ) : gamesState.games.length ? (
              <Quiz updateTags={updateTags} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/recommendation">
            {tagsArrState.length ? (
              <Recommendation
                resetQuiz={resetQuiz}
                tagsArr={tagsArrState}
                games={gamesState.games}
                addToFavorites={addToFavorites}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
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
