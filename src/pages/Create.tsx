import NavigationMenu from "../components/NavigationMenu";
import classes from "./Create.module.css";
import React, { useState, type ChangeEvent } from "react";
import QuestionSlideList from "../components/create/QuestionSlideList";
import SecondsCircleLayout from "../components/create/SecondsCircleLayout";

export type QuestionType = {
  questionText: string;
  answerOptions: string[];
  correctIndexes: number[];
  timeLimit: number;
  scoringWeight: 0.5 | 1 | 2;
  questionImage: string;
};

const Create: React.FC<{ questions?: QuestionType[] }> = (props) => {
  // דוגמא לשאלות
  const [questions, setQuestions] = useState<QuestionType[]>(
    props.questions ?? [
      {
        questionText: "",
        answerOptions: ["", "", "", "", "", ""],
        correctIndexes: [0],
        timeLimit: 20,
        scoringWeight: 1,
        questionImage: "xx",
      },
    ],
  );
  const [currentQuestionBeingEdited, setCurrentQuestionBeingEdited] =
    useState(0);
  const [questionTextInput, setQuestionTextInput] = useState(
    questions[0]?.questionText,
  );
  const options = [0.5, 1, 2];
  const [scoringWeight, setScoringWeight] = useState(1);
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

  const handleQuestionBeingEditedChange = (index: number) => {
    setCurrentQuestionBeingEdited(index);
    setQuestionTextInput(questions[index].questionText);
    setTimeLimitInput(questions[index].timeLimit);
  };

  const handleSlideCopyClick = (index: number) => {};

  const handleSlideDeleteClick = (index: number) => {};

  const addEmptyQuestion = () => {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          questionText: "",
          answerOptions: [],
          correctIndexes: [],
          timeLimit: 20,
          scoringWeight: 1,
          questionImage: "",
        },
      ];
    });
    setCurrentQuestionBeingEdited(questions.length);
    setQuestionTextInput("");
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
          style={{ "--index": options.indexOf(scoringWeight) } as React.CSSProperties}
        >
          <input
            type="range"
            min={0}
            max={options.length - 1}
            step={1}
            value={options.indexOf(scoringWeight)}
            onChange={(e) => {
              setScoringWeight(options[Number(e.target.value)]);
            }}
          />
          <div className={classes["range-thumb-label"]}>X{scoringWeight}</div>
        </div>
        <SecondsCircleLayout
          items={[20, 30, 60, 90, 120, 240, 5, 10]}
          center={timeLimitInput}
          onCenterChange={handleQuestionTimeLimitChange}
        />
      </div>
      {/* questions slides */}
      <div className={classes["questions-slides"]}>
        <QuestionSlideList
          currentQuestionEdited={currentQuestionBeingEdited}
          onSlideClick={handleQuestionBeingEditedChange}
          onSlideCopyClick={handleSlideCopyClick}
          onSlideDeleteClick={handleSlideDeleteClick}
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
