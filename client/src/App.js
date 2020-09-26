import React, { useEffect, useState } from 'react';
import './utils/API';
import { Grommet, Button, Heading, Anchor, Box } from 'grommet';
import AppBar from './components/AppBar';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Recommendation from './pages/Recommendation';
import Favorites from './pages/Favorites';
import { Redirect, Route, Switch } from 'react-router-dom';
import theme from './utils/theme';
import API from './utils/API';
import { useHistory } from 'react-router-dom';

function App() {
  const [gamesState, setGamesState] = useState({
    games: [],
    steamID: '',
  });
  const [tagsArrState, setTagsArrState] = useState([]);

  useEffect(() => {
    const games = localStorage.getItem('games');
    const user = localStorage.getItem('steamID');
    if (games && user) {
      setGamesState({
        games: JSON.parse(games),
        steamID: user,
      });
    }
    window.addEventListener('message', (event) => {
      if (!event.data.gamesRes) {
        return;
      }
      const { games, ok, steamID } = event.data;
      if (ok) {
        handleLocalStorageReset(JSON.parse(games), steamID);
      }
    });
  }, []);

  const handleLocalStorageReset = (games, steamID) => {
    setGamesState({
      games: games,
      steamID: steamID,
    });
    localStorage.setItem('games', JSON.stringify(games));
    localStorage.setItem('steamID', steamID);
  };

  const login = () => {
    const path = process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/auth/steam`
      : '/auth/steam';
    const popupWindow = window.open(path, '_blank', 'width=800, height=600');
    if (window.focus) popupWindow.focus();
  };

  const logout = () => {
    localStorage.removeItem('games');
    localStorage.removeItem('steamID');
    setGamesState({
      games: [],
      steamID: '',
    });
  };

  const updateTags = (tagsArr) => {
    setTagsArrState(tagsArr);
  };

  const resetQuiz = () => {
    setTagsArrState([]);
  };

  const history = useHistory();
  const handleFavsRoute = () => {
    history.push('/favorites');
  };

  const handleGamesStateResetAfterFavoritesRouteBecauseReactWontDoItForMe = async () => {
    //look at how gross this is
    const games = localStorage.getItem('games');
    //this is your fault react
    const user = localStorage.getItem('steamID');
    //I'm doing this because of you
    if (games && user) {
      //look at it
      setGamesState({
        //its disgusting
        games: JSON.parse(games),
        //this shouldn't be happening
        steamID: user,
        //but it is
      });
    }
    return gamesState.games.length ? true : false;
  };
  const addToFavorites = async (title) => {
    const res = await API.addToFavorites(title, gamesState.steamID);
    if (res.status === 200 || res.status === 201) {
      const games = [...gamesState.games];
      games.forEach((game) => {
        if (game.title === title) {
          game.isFavorite = true;
        }
      });
      handleLocalStorageReset(games, gamesState.steamID);
      return true;
    } else return false;
  };

  const getFavorites = async (steamID) => {
    const favorites = await API.getFavorites(steamID);
    return favorites;
  };

  const deleteFromFavorites = async (title) => {
    const res = await API.deleteFromFavorites(title, gamesState.steamID);
    if (res.status === 200) {
      const games = [...gamesState.games];
      games.forEach((game) => {
        if (game.title === title) {
          game.isFavorite = true;
        }
      });
      handleLocalStorageReset(games, gamesState.steamID);
      return true;
    } else return false;
  };

  return (
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
              // href="/favorites"
              onClick={handleFavsRoute}
            />
            <Button label="Log Out" primary hoverIndicator onClick={logout} />
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
              deleteFromFavorites={deleteFromFavorites}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/favorites">
          <Favorites
            getFavorites={getFavorites}
            deleteFromFavorites={deleteFromFavorites}
            steamID={gamesState}
            handleTrash={
              handleGamesStateResetAfterFavoritesRouteBecauseReactWontDoItForMe
            }
          />
        </Route>
      </Switch>
    </Grommet>
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
