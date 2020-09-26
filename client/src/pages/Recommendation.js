import React, { useEffect, useState } from 'react';
import { Button, Heading, Box } from 'grommet';
import MyCard from '../components/MyCard';

const Recommendation = ({
  resetQuiz,
  tagsArr,
  games,
  addToFavorites,
  deleteFromFavorites,
}) => {
  const [matchedGamesState, setMatchedGamesState] = useState([]);
  const [uiState, setUIState] = useState({
    gameCards: [],
  });

  useEffect(() => {
    getRecommendations(tagsArr, games);
  }, []);

  useEffect(() => {
    if (matchedGamesState.length) {
      loadRecommendations(tagsArr);
    }
  }, [matchedGamesState]);

  const getRecommendations = (tagsArr, games) => {
    const matches = [];
    games.forEach((game) => {
      if (!game) return;
      const matchedGame = {
        title: game.title,
        imgURL: game.imgURL,
        matches: 0,
        isFavorite: game.isFavorite,
      };
      game.genres.forEach(
        (genre) =>
          (matchedGame.matches = tagsArr.includes(genre.toLowerCase())
            ? matchedGame.matches + 1
            : matchedGame.matches)
      );
      if (matchedGame.matches > 0) {
        matches.push(matchedGame);
      }
    });
    setMatchedGamesState(matches);
  };

  const handleAddToFavorites = async (title) => {
    const resIsOk = await addToFavorites(title);
    if (resIsOk) {
      const matches = [...matchedGamesState];
      matches.forEach((game) => {
        if (game.title === title) {
          game.isFavorite = true;
        }
      });
      setMatchedGamesState([...matches]);
    }
  };

  const handleDeleteFromFavorites = async (title) => {
    const resIsOk = await deleteFromFavorites(title);
    if (resIsOk) {
      const matches = [...matchedGamesState];
      matches.forEach((game) => {
        if (game.title === title) {
          game.isFavorite = false;
        }
      });
      setMatchedGamesState([...matches]);
    }
  };

  const loadRecommendations = (tagsArr) => {
    const gameCards = [];

    let desiredMatches = tagsArr.length;

    do {
      matchedGamesState.forEach((game) => {
        if (game.matches === desiredMatches) {
          const cardProps = {
            text: game.title,
            clickHandler: game.isFavorite
              ? handleDeleteFromFavorites
              : handleAddToFavorites,
            image: game.imgURL,
            isFavorite: game.isFavorite,
          };
          gameCards.push(<MyCard {...cardProps} key={cardProps.text} />);
        }
      });
      desiredMatches--;
    } while (gameCards.length <= 5 && desiredMatches >= 0);
    setUIState({ gameCards: gameCards.slice(0, 10) });
  };

  return (
    <Box
      flex
      align="center"
      direction="column"
      justify="center"
      background="background"
      pad="large"
    >
      <Heading level="3" margin="none" color="lightPurp" textAlign="center">
        Based on your quiz results, these games might be a good fit!
      </Heading>
      <Box flex direction="row" justify="center" pad="large" wrap={true}>
        {uiState.gameCards}
      </Box>
      <Box flex direction="row" justify="center" pad="large" wrap={true}>
        <Button
          hoverIndicator
          primary
          onClick={resetQuiz}
          alignSelf="center"
          size="large"
        >
          Reset Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default Recommendation;
