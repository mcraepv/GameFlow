import React, { useEffect, useState } from 'react';
import { Heading, Box } from 'grommet';
import API from '../utils/API';
import MyCard from '../components/MyCard';

const Quiz = ({ updateTags }) => {
  const [quizState, setQuizState] = useState();
  const [uiState, setUIState] = useState({
    question: '',
    options: [],
  });
  const [answeredState, setAnsweredState] = useState(0);
  const [tagsArrState, setTagsArrState] = useState([]);

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    if (quizState) stageQuiz();
  }, [quizState]);

  useEffect(() => {
    if (tagsArrState.length) setAnsweredState(answeredState + 1);
  }, [tagsArrState]);

  useEffect(() => {
    if (answeredState < 4 && answeredState) {
      stageQuiz();
    } else {
      updateTags(tagsArrState);
    }
  }, [answeredState]);

  const getQuiz = async () => {
    const quiz = await API.getQuiz();
    setQuizState(quiz.data);
  };

  const handleOptionSelect = (tag) => {
    if (tag !== 'none') {
      setTagsArrState([...tagsArrState, tag]);
    } else {
      setAnsweredState(answeredState + 1);
    }
  };

  const stageQuiz = () => {
    let options;
    let question;
    const optionEls = [];
    switch (answeredState) {
      case 0:
        question = quizState.genreQ.question;
        options = quizState.genreQ.options;
        break;
      case 1:
        question =
          quizState.genreQ.options[tagsArrState[0]].drillDowns.question;
        options = quizState.genreQ.options[tagsArrState[0]].drillDowns.options;
        break;
      case 2:
        question = quizState.settingQ.question;
        options = quizState.settingQ.options;
        break;
      case 3:
        question = quizState.playerQ.question;
        options = quizState.playerQ.options;
        break;
    }
    const objKeys = Object.keys(options);
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
      <Heading level="2" margin="none" color="lightPurp" textAlign="center">
        {uiState.question}
      </Heading>
      <Box flex direction="row" justify="center" pad="large" wrap={true}>
        {uiState.options}
      </Box>
    </Box>
  );
};

export default Quiz;
