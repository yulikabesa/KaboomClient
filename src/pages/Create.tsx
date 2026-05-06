import NavigationMenu from "../components/NavigationMenu";
import classes from "./Create.module.css";
import React, { useState, type ChangeEvent } from "react";
import QuestionSlideList from "../components/create/QuestionSlideList";
import SecondsCircleLayout from "../components/create/SecondsCircleLayout";
import { useLocation } from "react-router-dom";
import AnswerOptionsInputList from "../components/create/AnswerOptionsInputList";
import {
  questionsReducer,
  createEmptyQuestion,
} from "../reducers/questionsReducer";

const Create: React.FC<{}> = () => {
  const location = useLocation();
  const data = location.state;

  console.log(data);
  const initialQuestions =
  Array.isArray(data) && data.length > 0
    ? data
    : [createEmptyQuestion()];

  const [questions, dispatch] = React.useReducer(
    questionsReducer,
    initialQuestions,
  );

  const [currentQuestionBeingEdited, setCurrentQuestionBeingEdited] =
    useState(0);
  const scoringWeightOptions = [0.5, 1, 2];
  const currentQuestion = questions[currentQuestionBeingEdited];

  const handleQuestionTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_QUESTION_TEXT",
      index: currentQuestionBeingEdited,
      value: e.target.value,
    });
  };

  const handleQuestionTimeLimitChange = (timeLimit: number) => {
    dispatch({
      type: "SET_TIME_LIMIT",
      index: currentQuestionBeingEdited,
      value: timeLimit,
    });
  };

  const handleQuestionScoringWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const index = +e.target.value;
    const weight = scoringWeightOptions[index];

    dispatch({
      type: "SET_SCORING_WEIGHT",
      index: currentQuestionBeingEdited,
      value: weight,
    });
  };

  const handleQuestionCorrectIndexesChange = (value: number) => {
    dispatch({
      type: "TOGGLE_CORRECT_INDEX",
      index: currentQuestionBeingEdited,
      value,
    });
  };

  const handleQuestionBeingEditedChange = (index: number) => {
    setCurrentQuestionBeingEdited(index);
  };

  const handleCurrentSlideCopyClick = () => {
    dispatch({
      type: "COPY_QUESTION",
      index: currentQuestionBeingEdited,
    });

    setCurrentQuestionBeingEdited((prev) => prev + 1);
  };

  const handleCurrentSlideDeleteClick = () => {
    dispatch({
      type: "DELETE_QUESTION",
      index: currentQuestionBeingEdited,
    });
    setCurrentQuestionBeingEdited((prev) => Math.max(0, prev - 1));
  };

  const addEmptyQuestion = () => {
    dispatch({ type: "ADD_QUESTION" });
    setCurrentQuestionBeingEdited(questions.length);
  };

  return (
    <div className={classes.background}>
      <NavigationMenu variant="create" />
      {/* question editing */}
      <div className={classes["question-editing"]}>
        <input
          type="text"
          placeholder="הקלד כאן את השאלה שלך…"
          className={classes["question-text-input"]}
          value={currentQuestion.questionText}
          onChange={handleQuestionTextInputChange}
          maxLength={72}
        />
        <div
          className={classes["slider-wrap"]}
          style={
            {
              "--index": scoringWeightOptions.indexOf(
                currentQuestion.scoringWeight,
              ),
            } as React.CSSProperties
          }
        >
          <input
            type="range"
            min={0}
            max={scoringWeightOptions.length - 1}
            step={1}
            value={scoringWeightOptions.indexOf(currentQuestion.scoringWeight)}
            onChange={handleQuestionScoringWeightChange}
          />
          <div className={classes["range-thumb-label"]}>
            X{currentQuestion.scoringWeight}
          </div>
        </div>
        <SecondsCircleLayout
          items={[20, 30, 60, 90, 120, 240, 5, 10]}
          center={currentQuestion.timeLimit}
          onCenterChange={handleQuestionTimeLimitChange}
        />
        <AnswerOptionsInputList
          correctAnswerIndexes={currentQuestion.correctIndexes}
          answersCount={6}
          answerTexts={currentQuestion.answerOptions}
          onAnswerClick={(index) => handleQuestionCorrectIndexesChange(index)}
        />
      </div>

      {/* questions slides */}
      <div className={classes["questions-slides"]}>
        <QuestionSlideList
          currentQuestionEdited={currentQuestionBeingEdited}
          onSlideClick={handleQuestionBeingEditedChange}
          onSlideCopyClick={handleCurrentSlideCopyClick}
          onSlideDeleteClick={handleCurrentSlideDeleteClick}
          questions={questions}
        />
        <div className={classes["blue-btn"]} onClick={addEmptyQuestion}>
          הוסף שאלה
        </div>
      </div>
    </div>
  );
};

export default Create;
