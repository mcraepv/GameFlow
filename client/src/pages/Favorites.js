import React, { useEffect, useState } from 'react';
import { Button, Heading, Box } from 'grommet';
import MyCard from '../components/MyCard';

const Favorites = ({ getFavorites, deleteFromFavorites, handleTrash }) => {
  const [uiState, setUIState] = useState({ gameCards: [], oopsText: '' });

  useEffect(() => {
    getAndSetFavorites();
  }, []);

  const handleFavDelete = async (title) => {
    const resIsOk = await deleteFromFavorites(title);
    if (resIsOk) {
      setUIState({});
      getAndSetFavorites();
    }
  };

  const getAndSetFavorites = async () => {
    const isTheTrashHandled = await handleTrash();
    if (isTheTrashHandled) {
      const steamID = localStorage.getItem('steamID');
      const res = await getFavorites(steamID);
      const favorites = res.data;
      console.log(favorites);
      console.log(res);
      if (favorites.length) {
        const favoriteEls = [];
        favorites.forEach((fav) => {
          const cardProps = {
            text: fav.title,
            clickHandler: handleFavDelete,
            image: fav.imgURL,
            isFavorite: true,
          };
          favoriteEls.push(<MyCard {...cardProps} key={cardProps.text} />);

          setUIState({ gameCards: favoriteEls });
        });
      } else
        setUIState({
          oopsText: (
            <Heading level="3">
              Oops! It looks like you haven't set any favorites!
            </Heading>
          ),
        });
    }
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
      <Heading level="2" margin="none" color="lightPurp" textAlign="center">
        Favorites
      </Heading>
      <Box flex direction="row" justify="center" pad="large" wrap={true}>
        {uiState.gameCards ? uiState.gameCards : uiState.oopsText}
      </Box>
    </Box>
  );
};

export default Favorites;
