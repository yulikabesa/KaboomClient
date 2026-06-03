import type { ChangeEvent } from "react";
import type { questionImageType } from "../types/quiz";
import type { QuestionsAction } from "../reducers/questionsReducer";

export const useQuestionEditor = (
  dispatch: React.Dispatch<QuestionsAction>,
  currentQuestionBeingEdited: number,
) => {
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
    const scoringWeightOptions = [0.5, 1, 2];
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

  const handleAnswerTextChange = (answerIndex: number, value: string) => {
    dispatch({
      type: "SET_ANSWER_OPTION",
      questionIndex: currentQuestionBeingEdited,
      answerIndex,
      value,
    });
  };

  const updateQuestionImage = (updates: Partial<questionImageType>) => {
    dispatch({
      type: "SET_IMAGE_DETAILS",
      payload: {
        index: currentQuestionBeingEdited,
        updates,
      },
    });
  };

  return {
    handleQuestionTextInputChange,
    handleQuestionTimeLimitChange,
    handleQuestionScoringWeightChange,
    handleQuestionCorrectIndexesChange,
    handleAnswerTextChange,
    updateQuestionImage,
  };
};
