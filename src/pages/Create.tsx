import NavigationMenu from "../components/NavigationMenu";
import classes from "./Create.module.css";
import React, { useState, type ChangeEvent } from "react";
import QuestionSlideList from "../components/create/QuestionSlideList";
import SecondsCircleLayout from "../components/create/SecondsCircleLayout";
import type { questionType } from "../components/ProductsList";
import { useLocation } from "react-router-dom";
import AnswerOptionsInputList from "../components/create/AnswerOptionsInputList";

const Create: React.FC<{}> = () => {
  const location = useLocation();
  const data = location.state;
  const [questions, setQuestions] = useState<questionType[]>(
    data ?? [
      {
        questionText: "",
        answerOptions: ["", ""],
        correctIndexes: [0],
        timeLimit: 20,
        scoringWeight: 1,
        questionImage: "",
      },
    ],
  );
  const [currentQuestionBeingEdited, setCurrentQuestionBeingEdited] =
    useState(0);
  const scoringWeightOptions = [0.5, 1, 2];
  const currentQuestion = questions[currentQuestionBeingEdited];

  const handleQuestionTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuestions((prev) => {
      const updated = [...prev];
      const q = updated[currentQuestionBeingEdited];
      updated[currentQuestionBeingEdited] = {
        ...q,
        questionText: value,
      };
      return updated;
    });
  };

  const handleQuestionTimeLimitChange = (timeLimit: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const q = updated[currentQuestionBeingEdited];
      updated[currentQuestionBeingEdited] = {
        ...q,
        timeLimit,
      };
      return updated;
    });
  };

  const handleQuestionScoringWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const index = +e.target.value;
    const weight = scoringWeightOptions[index];
    setQuestions((prev) => {
      const updated = [...prev];
      const q = updated[currentQuestionBeingEdited];
      updated[currentQuestionBeingEdited] = {
        ...q,
        scoringWeight: weight,
      };
      return updated;
    });
  };

  const handleQuestionCorrectIndexesChange = (index: number) => {
    const newCorrectIndexes = currentQuestion.correctIndexes.includes(index)
      ? currentQuestion.correctIndexes.filter((i) => i !== index)
      : [...currentQuestion.correctIndexes, index];
    setQuestions((prev) => {
      const updated = [...prev];
      const q = updated[currentQuestionBeingEdited];
      updated[currentQuestionBeingEdited] = {
        ...q,
        correctIndexes: newCorrectIndexes,
      };
      return updated;
    });
  };

  const handleQuestionBeingEditedChange = (index: number) => {
    setCurrentQuestionBeingEdited(index);
  };

  const handleCurrentSlideCopyClick = () => {
    // todo
  };

  const createEmptyQuestion = (): questionType => ({
    questionText: "",
    answerOptions: ["", ""],
    correctIndexes: [0],
    timeLimit: 20,
    scoringWeight: 1,
    questionImage: "",
  });

  const handleCurrentSlideDeleteClick = () => {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions.splice(currentQuestionBeingEdited, 1);

      // prevent empty
      if (newQuestions.length === 0) {
        newQuestions = [createEmptyQuestion()];
      }

      setCurrentQuestionBeingEdited((prevIndex) => {
        if (prevIndex >= newQuestions.length) {
          return newQuestions.length - 1;
        }
        return prevIndex;
      });

      return newQuestions;
    });
  };

  const addEmptyQuestion = () => {
    setQuestions((prev) => {
      const newQuestions = [...prev, createEmptyQuestion()];
      setCurrentQuestionBeingEdited(newQuestions.length - 1);
      return newQuestions;
    });
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
            onChange={(e) => handleQuestionScoringWeightChange(e)}
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
