import React, { useEffect, useState } from 'react';
import { Button, Heading, Box, Paragraph, Image, Grid } from 'grommet';
import API from '../utils/API';
import MyCard from '../components/MyCard';

const Quiz = () => {
  const [quizState, setQuizState] = useState();
  const [uiState, setUIState] = useState({
    question: '',
    options: [],
  });
  const [answeredState, setAnsweredState] = useState(0);
  const [tagArrState, setTagArrState] = useState([]);

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    if (quizState) stageQuiz();
  }, [quizState]);

  useEffect(() => {
    if (tagArrState.length) setAnsweredState(answeredState + 1);
  }, [tagArrState]);

  useEffect(() => {
    if (answeredState) stageQuiz();
  }, [answeredState]);

  const getQuiz = async () => {
    const quiz = await API.getQuiz();
    setQuizState(quiz.data);
  };

  const handleOptionSelect = (tag) => {
    console.log('hello');
    setTagArrState([...tagArrState, tag]);
  };

  const stageQuiz = () => {
    let options;
    let question;
    const optionEls = [];
    console.log(answeredState);
    switch (answeredState) {
      case 0:
        question = quizState.genreQ.question;
        options = quizState.genreQ.options;
        break;
      case 1:
        question = quizState.genreQ.options[tagArrState[0]].drillDowns.question;
        options = quizState.genreQ.options[tagArrState[0]].drillDowns.options;
        break;
    }
    const objKeys = Object.keys(options);
    console.log(objKeys);
    objKeys.forEach((key) => {
      const option = options[key];
      const cardProps = {
        text: option.option,
        clickHandler: handleOptionSelect,
        btnText: 'Select',
        image: option.image,
        tag: option.key,
      };
      optionEls.push(<MyCard {...cardProps} key={option.key} />);
    });

    setUIState({
      question: question,
      options: optionEls,
    });
  };

  return (
    <Box
      flex
      align="center"
      direction="column"
      justify="center"
      background="background"
      pad="xlarge"
    >
      <Heading level="3" margin="none" color="lightPurp" textAlign="center">
        {uiState.question}
      </Heading>
      <Box flex direction="row" justify="center" pad="large" wrap={true}>
        {uiState.options}
      </Box>
    </Box>
  );
};

export default Quiz;
