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
  const [currentQuestionBeingEdited, setCurrentQuestionBeingEdited] = useState(0);
  const [questionTextInput, setQuestionTextInput] = useState(
    questions[0]?.questionText,
  );
  const [center, setCenter] = useState(20);

  const handleQuestionTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionTextInput(e.target.value);
    setQuestions((prev) => {
      prev[currentQuestionBeingEdited].questionText = e.target.value;
      return prev;
    });
  };

  const handleQuestionTimeLimitChange = (timeLimit: number) => {
    setCenter(timeLimit);
    setQuestions((prev) => {
      prev[currentQuestionBeingEdited].timeLimit = timeLimit;
      return prev;
    });
  };

  const handleQuestionBeingEditedChange = (index: number) => {
    setCurrentQuestionBeingEdited(index);
    setQuestionTextInput(questions[index].questionText);
    setCenter(questions[index].timeLimit);
  };

  const handleSlideCopyClick = (index: number) => {

  };

  const handleSlideDeleteClick = (index: number) => {

  };

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
    setCenter(20);
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
        />
        <SecondsCircleLayout
          items={[20, 30, 60, 90, 120, 240, 5, 10]}
          center={center}
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
