import React, { useEffect, useState } from 'react';
import { Button, Heading, Box, Paragraph, Image, Grid } from 'grommet';
import MyCard from '../components/MyCard';

const Recommendation = ({ resetQuiz }) => {
  const cardProps = {
    text: 'Hello McRae!',
    clickHandler: resetQuiz,
    image: '',
    btnText: 'Reset Quiz',
  };
  return <MyCard {...cardProps} />;
};

export default Recommendation;
