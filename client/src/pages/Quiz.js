import React, { useEffect, useState } from 'react';
import { Button, Heading, Box, Paragraph, Image } from 'grommet';
import API from '../utils/API';

const Quiz = () => {
  const [quizState, setQuizState] = useState({
    quiz: [],
  });
  useEffect(() => {
    getQuiz();
  });

  const getQuiz = async () => {
    const quiz = await API.getQuiz();

    setQuizState({
      quiz: quiz.data,
    });
  };

  // API.getQuiz().then((quiz) => {
  //   setQuizState({ quiz: quiz });
  // });

  // console.log(quizState.quiz);

  return <h1>Hello World</h1>;
};

export default Quiz;
