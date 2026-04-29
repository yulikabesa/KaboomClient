import NavigationMenu from "../components/NavigationMenu";
import classes from "./Create.module.css";
import QuestionSlide from "../components/create/QuestionSlide";
import { useState, type ChangeEvent } from "react";
import QuestionSlideList from "../components/create/QuestionSlideList";
import ImageInput from "../components/create/ImageInput";

export type QuestionType = {
  questionText: string;
  answerOptions: string[];
  correctIndexes: number[];
  timeLimit: number;
  scoringWeight: 0.5 | 1 | 2;
  questionImage: string;
};

const Create = () => {
  // דוגמא לשאלות
  const [questions, setQuestions] = useState<QuestionType[]>([
    {
      questionText: "?",
      answerOptions: ["this", "that"],
      correctIndexes: [1],
      timeLimit: 20,
      scoringWeight: 1,
      questionImage: "xx",
    },
  ]);
  const [currentQuestionEdited, setCurrentQuestionEdited] = useState(0);
  const [questionTextInput, setQuestionTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleQuestionTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionTextInput(e.target.value);
    setQuestions((prev) => {
      prev[currentQuestionEdited].questionText = e.target.value;
      return prev;
    });
  };

  const handleQuestionEditedChange = (index: number) => {
    setCurrentQuestionEdited(index);
    setQuestionTextInput(questions[index].questionText);
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
    setCurrentQuestionEdited(questions.length);
    setQuestionTextInput("");
  };

  const handleImageChange = (file: string) => {
    setSelectedImage(file);
    setQuestions((prev) => {
      prev[currentQuestionEdited].questionImage = selectedImage;
      return prev;
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
          value={questionTextInput}
          onChange={handleQuestionTextInputChange}
        />
        <ImageInput value={selectedImage} onChange={handleImageChange} />
      </div>
      {/* question navigator */}
      <div className={classes["question-navigator"]}>
        <QuestionSlideList
          currentQuestionEdited={currentQuestionEdited}
          handleQuestionEditedChange={handleQuestionEditedChange}
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
