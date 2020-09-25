import React, { useEffect, useState } from 'react';
import { Heading, Box } from 'grommet';
import quiz from '../utils/quiz.json';
import MyCard from '../components/MyCard';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Quiz = ({ updateTags }) => {
  const [quizState, setQuizState] = useState(quiz);
  const [uiState, setUIState] = useState({
    question: '',
    options: [],
  });
  const [answeredState, setAnsweredState] = useState({
    genreQuestionsAnswered: 0,
    genreIsSelected: false,
    subgenreIsSelected: false,
    settingSelected: false,
    playersSelected: false,
    genresSelected: {},
    genresNotSelected: [],
    isIteration: false,
  });
  const [tagsArrState, setTagsArrState] = useState([]);

  useEffect(() => {
    if (quizState) stageQuiz();
  }, [quizState]);

  useEffect(() => {
    if (answeredState.isIteration && !answeredState.playersSelected)
      setUIState({
        question: '',
        options: [],
      });
  }, [answeredState]);

  useEffect(() => {
    if (!uiState.options.length) {
      stageQuiz();
    }
  }, [uiState]);

  useEffect(() => {
    if (answeredState.playersSelected) {
      updateTags(tagsArrState);
    }
  }, [answeredState, tagsArrState]);

  const handleNonGenreOptionSelect = (tag) => {
    setTagsArrState([...tagsArrState, tag]);
    if (!answeredState.settingSelected) {
      setAnsweredState((prevState) => ({
        ...prevState,
        settingSelected: true,
      }));
    } else if (
      answeredState.settingSelected &&
      !answeredState.playersSelected
    ) {
      setAnsweredState((prevState) => ({
        ...prevState,
        playersSelected: true,
      }));
    }
  };

  const handleGenreOptionSelect = (tag, tested) => {
    if (answeredState.genreQuestionsAnswered === 3) {
      let highestPicks = 0;
      let finalPick;

      let selectedKeys = Object.keys(answeredState.genresSelected);
      selectedKeys.forEach((key) => {
        if (answeredState.genresSelected[key] > highestPicks) {
          highestPicks = answeredState.genresSelected[key];
          finalPick = key;
        }
      });
      setTagsArrState((prevState) => [...prevState, finalPick]);

      if (!answeredState.genreIsSelected) {
        setAnsweredState({
          genreQuestionsAnswered: 0,
          genreIsSelected: true,
          subgenreIsSelected: false,
          settingSelected: false,
          playersSelected: false,
          genresSelected: {},
          genresNotSelected: [],
          isIteration: true,
        });
      } else if (answeredState.genreIsSelected) {
        setAnsweredState({
          genreQuestionsAnswered: 0,
          genreIsSelected: true,
          subgenreIsSelected: true,
          settingSelected: false,
          playersSelected: false,
          genresSelected: {},
          genresNotSelected: [],
          isIteration: true,
        });
      }
    } else {
      const selectedStateUpdate = answeredState.genresSelected;
      let notSelected;
      tested.forEach((genre) => {
        if (genre !== tag) {
          notSelected = genre;
        }
      });

      if (answeredState.genresSelected[tag]) {
        selectedStateUpdate[tag] = answeredState.genresSelected[tag] + 1;
      } else selectedStateUpdate[tag] = 1;

      if (answeredState.genresSelected[notSelected]) {
        delete selectedStateUpdate[notSelected];
      }

      setAnsweredState((prevState) => ({
        ...prevState,
        genresSelected: {
          ...selectedStateUpdate,
        },
        genreQuestionsAnswered: prevState.genreQuestionsAnswered + 1,
        genresNotSelected: [...prevState.genresNotSelected, notSelected],
        isIteration: true,
      }));
    }
  };

  const stageQuiz = () => {
    let optionKeys, question, quizStage;

    const stageGenreQuestion = (question, optionKeys, quizStage) => {
      optionKeys.splice(optionKeys.indexOf('question'), 1);

      const getRandomIndex = (prev, max) => {
        const random = Math.floor(Math.random() * max);
        return random !== prev ? random : getRandomIndex(prev, max);
      };

      if (answeredState.genresNotSelected.length) {
        answeredState.genresNotSelected.forEach((genre) => {
          optionKeys.splice(optionKeys.indexOf(genre), 1);
        });
      }

      let firstGenreOptionIndex, secondGenreOptionIndex;

      const genresSelectedArr = Object.keys(answeredState.genresSelected);

      if (answeredState.genreQuestionsAnswered < 2) {
        if (genresSelectedArr.length) {
          genresSelectedArr.forEach((key) => {
            optionKeys.splice(optionKeys.indexOf(key), 1);
          });
        }

        firstGenreOptionIndex = getRandomIndex(-1, optionKeys.length);
        secondGenreOptionIndex = getRandomIndex(
          firstGenreOptionIndex,
          optionKeys.length
        );
      } else if (answeredState.genreQuestionsAnswered === 2) {
        optionKeys.splice(optionKeys.indexOf(genresSelectedArr[1]), 1);
        firstGenreOptionIndex = optionKeys.indexOf(genresSelectedArr[0]);
        secondGenreOptionIndex = getRandomIndex(
          firstGenreOptionIndex,
          optionKeys.length
        );
        console.log('= 2', firstGenreOptionIndex, secondGenreOptionIndex);
      } else if (answeredState.genreQuestionsAnswered === 3) {
        firstGenreOptionIndex = optionKeys.indexOf(
          genresSelectedArr[genresSelectedArr.length - 2]
        );
        secondGenreOptionIndex = optionKeys.indexOf(
          genresSelectedArr[genresSelectedArr.length - 1]
        );
      }

      //fixes bug that only happens sometimes. maybe one day we'll discover why
      //============================================================================
      if (firstGenreOptionIndex === -1) {
        firstGenreOptionIndex = getRandomIndex(-1, optionKeys.length);
      }

      if (secondGenreOptionIndex === -1) {
        firstGenreOptionIndex = getRandomIndex(
          firstGenreOptionIndex,
          optionKeys.length
        );
      }
      //=============================================================================

      const firstGenreOption = quizStage[optionKeys[firstGenreOptionIndex]];
      const secondGenreOption = quizStage[optionKeys[secondGenreOptionIndex]];

      const firstOptionText =
        firstGenreOption.options[
          getRandomIndex(-1, firstGenreOption.options.length)
        ];

      const secondOptionText =
        secondGenreOption.options[
          getRandomIndex(-1, secondGenreOption.options.length)
        ];

      const firstOptionImage =
        firstGenreOption.images[
          getRandomIndex(-1, firstGenreOption.images.length)
        ];

      const secondOptionImage =
        secondGenreOption.images[
          getRandomIndex(-1, secondGenreOption.images.length)
        ];

      const firstCardProps = {
        text: firstOptionText,
        clickHandler: handleGenreOptionSelect,
        btnText: 'Select',
        image: firstOptionImage,
        tag: firstGenreOption.key,
        tested: [firstGenreOption.key, secondGenreOption.key],
      };

      const secondCardProps = {
        text: secondOptionText,
        clickHandler: handleGenreOptionSelect,
        btnText: 'Select',
        image: secondOptionImage,
        tag: secondGenreOption.key,
        tested: [firstGenreOption.key, secondGenreOption.key],
      };

      const optionEls = [];
      optionEls.push(<MyCard {...firstCardProps} key={firstGenreOption.key} />);
      optionEls.push(
        <MyCard {...secondCardProps} key={secondGenreOption.key} />
      );

      setUIState({
        question: question,
        options: optionEls,
      });
    };

    const stageNonGenreQuestion = (question, optionKeys, quizStage) => {
      const optionEls = [];
      optionKeys.forEach((key) => {
        const option = quizStage.options[key];
        const cardProps = {
          text: option.option,
          clickHandler: handleNonGenreOptionSelect,
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

    if (!answeredState.genreIsSelected) {
      question = quizState.genreQ.question;
      optionKeys = Object.keys(quizState.genreQ);
      quizStage = quizState.genreQ;
      stageGenreQuestion(question, optionKeys, quizStage);
    } else if (
      answeredState.genreIsSelected &&
      !answeredState.subgenreIsSelected
    ) {
      const genre = tagsArrState[0];
      question = quizState.genreQ[genre].drillDowns.question;
      optionKeys = Object.keys(quizState.genreQ[genre].drillDowns);
      quizStage = quizState.genreQ[genre].drillDowns;
      stageGenreQuestion(question, optionKeys, quizStage);
    } else if (
      answeredState.genreIsSelected &&
      answeredState.subgenreIsSelected &&
      !answeredState.settingSelected
    ) {
      question = quizState.settingQ.question;
      optionKeys = Object.keys(quizState.settingQ.options);
      quizStage = quizState.settingQ;
      stageNonGenreQuestion(question, optionKeys, quizStage);
    } else if (
      answeredState.genreIsSelected &&
      answeredState.subgenreIsSelected &&
      answeredState.settingSelected &&
      !answeredState.playersSelected
    ) {
      question = quizState.playerQ.question;
      optionKeys = Object.keys(quizState.playerQ.options);
      quizStage = quizState.playerQ;
      stageNonGenreQuestion(question, optionKeys, quizStage);
    }
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
