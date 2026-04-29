import NavigationMenu from "../components/NavigationMenu";
import classes from "./Create.module.css";
import QuestionHistory from "../components/create/QuestionHistory";
import { useState, type ChangeEvent } from "react";

type QuestionType = {
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
      questionText: "מה אתה עושה כשאתה קם בבוקר?",
      answerOptions: ["this", "that"],
      correctIndexes: [1],
      timeLimit: 20,
      scoringWeight: 1,
      questionImage: "xx",
    },
  ]);
  const [currentQuestionEdited, setCurrentQuestionEdited] = useState(0);
  const [questionTextInput, setQuestionTextInput] = useState("");

  const handleQuestionTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionTextInput(e.target.value);
    setQuestions((prev) => {
      prev[currentQuestionEdited].questionText = e.target.value;
      return prev;
    });
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
      </div>
      {/* question navigator */}
      <div className={classes["question-navigator"]}>
        {questions.map((question: QuestionType, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              color: "#6E6E6E",
              paddingTop: "2vh",
              paddingBottom: "2vh",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor:
                currentQuestionEdited === index ? "#ECF4FB" : "transparent",
            }}
            onClick={() => {
              setCurrentQuestionEdited(index);
              setQuestionTextInput(questions[index].questionText);
            }}
          >
            {index + 1} שאלה
            <QuestionHistory
              key={index}
              questionImage={question.questionImage}
              questionText={question.questionText}
              timeLimit={question.timeLimit}
              isCurrentlyEdited={currentQuestionEdited === index ? true : false}
            />
          </div>
        ))}
        <div className={classes["blue-btn"]} onClick={addEmptyQuestion}>
          הוסף שאלה
        </div>
      </div>
    </div>
  );
};

export default Create;
