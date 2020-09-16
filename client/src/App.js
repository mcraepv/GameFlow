import React, { useEffect } from 'react';
import './utils/API';
import { Grommet, Button, Heading, Box } from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from './components/AppBar';
import MyCard from './components/MyCard';
import Landing from './pages/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const theme = {
  global: {
    colors: {
      darkPurp: '#B64FC8',
      lightPurp: '#FFB2FF',
      background: '#202124',
      card: '#3C4042',
      primary: '#0e0f10',
      lightGray: '#A0A4A9',
    },
    font: {
      family: 'Ubuntu',
      size: '18px',
      height: '20px',
    },
  },
};

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

  // const cardProps = {
  //   imgAlt: 'Hello',
  //   imgLink: 'world',
  // };

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
        {/* <Box
        flex
        align="center"
        direction="row"
        justify="center"
        background="background"
      >
        <MyCard />
        <MyCard />
        <MyCard />
      </Box> */}
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
        <button onClick={login}>Login</button>
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
