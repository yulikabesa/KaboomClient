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
  // דוגמא לשאלות
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
  const [questionTextInput, setQuestionTextInput] = useState(
    questions[0]?.questionText,
  );
  const [answerOptions, setAnswerOptions] = useState(
    questions[0]?.answerOptions,
  );
  const [correctIndexes, setCorrectIndexes] = useState(
    questions[0]?.correctIndexes,
  );
  const scoringWeightOptions = [0.5, 1, 2];
  const [scoringWeight, setScoringWeight] = useState(
    questions[0]?.scoringWeight,
  );
  const [timeLimitInput, setTimeLimitInput] = useState(questions[0]?.timeLimit);

  const handleQuestionTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionTextInput(e.target.value);
    setQuestions((prev) => {
      prev[currentQuestionBeingEdited].questionText = e.target.value;
      return prev;
    });
  };

  const handleQuestionTimeLimitChange = (timeLimit: number) => {
    setTimeLimitInput(timeLimit);
    setQuestions((prev) => {
      prev[currentQuestionBeingEdited].timeLimit = timeLimit;
      return prev;
    });
  };

  const handleQuestionScoringWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoringWeight(scoringWeightOptions[+e.target.value]);
    setQuestions((prev) => {
      prev[currentQuestionBeingEdited].scoringWeight = +e.target.value;
      return prev;
    });
  };

  const handleQuestionCorrectIndexesChange = (index: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const q = updated[currentQuestionBeingEdited];
      updated[currentQuestionBeingEdited] = {
        ...q,
        correctIndexes: q.correctIndexes.includes(index)
          ? q.correctIndexes.filter((i) => i !== index)
          : [...q.correctIndexes, index],
      };
      return updated;
    });
  };

  const handleQuestionBeingEditedChange = (index: number) => {
    setCurrentQuestionBeingEdited(index);
    setQuestionTextInput(questions[index].questionText);
    setTimeLimitInput(questions[index].timeLimit);
    setScoringWeight(questions[index].scoringWeight);
    setAnswerOptions(questions[index].answerOptions);
    setCorrectIndexes(questions[index].correctIndexes);
  };

  const handleCurrentSlideCopyClick = () => {
    // todo
  };

  const handleCurrentSlideDeleteClick = () => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.splice(currentQuestionBeingEdited, 1);
      return newQuestions;
    });
    if (currentQuestionBeingEdited === questions.length - 1) {
      setCurrentQuestionBeingEdited(questions.length - 2);
    }
  };

  const addEmptyQuestion = () => {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          questionText: "",
          answerOptions: ["", ""],
          correctIndexes: [0],
          timeLimit: 20,
          scoringWeight: 1,
          questionImage: "",
        },
      ];
    });
    setCurrentQuestionBeingEdited(questions.length);
    setQuestionTextInput("");
    setScoringWeight(1);
    setTimeLimitInput(20);
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
          value={questionTextInput}
          onChange={handleQuestionTextInputChange}
          maxLength={72}
        />
        <div
          className={classes["slider-wrap"]}
          style={
            {
              "--index": scoringWeightOptions.indexOf(scoringWeight),
            } as React.CSSProperties
          }
        >
          <input
            type="range"
            min={0}
            max={scoringWeightOptions.length - 1}
            step={1}
            value={scoringWeightOptions.indexOf(scoringWeight)}
            onChange={(e) => handleQuestionScoringWeightChange(e)}
          />
          <div className={classes["range-thumb-label"]}>X{scoringWeight}</div>
        </div>
        <SecondsCircleLayout
          items={[20, 30, 60, 90, 120, 240, 5, 10]}
          center={timeLimitInput}
          onCenterChange={handleQuestionTimeLimitChange}
        />
        <AnswerOptionsInputList
          correctAnswerIndexes={correctIndexes}
          answersCount={6}
          answerTexts={answerOptions}
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
