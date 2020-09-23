import React, { useEffect, useState } from 'react';
import './utils/API';
import { Grommet, Button, Heading } from 'grommet';
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

const theme = {
  global: {
    active: {
      background: {
        color: '#202124',
      },
    },
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
  button: {
    default: {
      background: {
        color: '#202124',
      },
      border: {
        color: '#FFB2FF',
      },
    },
    primary: {
      background: {
        color: '#B64FC8',
      },
      border: {
        color: '#0e0f10',
      },
      hover: {
        background: {
          color: '#B64FC8',
        },
      },
    },
    background: {
      color: '#202124',
    },
    border: {
      color: '#FFB2FF',
    },
  },
};

function App() {
  const [gamesState, setGamesState] = useState({
    games: [],
  });
  const [tagsArrState, setTagsArrState] = useState([]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (!event.data.gamesRes) {
        return;
      }
      const { games, ok } = event.data;
      if (ok) {
        console.log(ok);
        setGamesState({
          games: JSON.parse(games),
        });
      }
    });
  });
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
          <Heading level="3" margin="none" color="lightPurp">
            GameFlow
          </Heading>
          <Button
            icon={<Notification color="lightPurp" />}
            onClick={() => {}}
          />
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
