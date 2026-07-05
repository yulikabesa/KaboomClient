import classes from "./QuestionEditor.module.css";
import RangeInput from "./RangeInput";
import ImageInput from "../Image/ImageInput";
import SecondsCircleLayout from "./SecondsCircleLayout";
import AnswerOptionsInputList from "./AnswerOptionsInputList";
import type { ChangeEvent } from "react";
import type { questionImageType, questionType } from "../../../types/quiz";

type QuestionEditorProps = {
  currentQuestion: questionType;
  questionImage?: questionImageType;
  handleQuestionTextInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleQuestionScoringWeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleQuestionTimeLimitChange: (timeLimit: number) => void;
  handleQuestionCorrectIndexesChange: (index: number) => void;
  handleAnswerTextChange: (answerIndex: number, value: string) => void;
  updateQuestionImage: (updates: Partial<questionImageType>) => void;
  isLoading: boolean;
};

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  currentQuestion,
  questionImage,
  handleQuestionTextInputChange,
  handleQuestionScoringWeightChange,
  handleQuestionTimeLimitChange,
  handleQuestionCorrectIndexesChange,
  handleAnswerTextChange,
  updateQuestionImage,
  isLoading,
}) => {
  return (
    <div className={classes["question-editing"]}>
      <input
        id="question-text"
        type="text"
        placeholder="הקלד כאן את השאלה שלך…"
        className={classes["question-text-input"]}
        value={currentQuestion.questionText}
        onChange={handleQuestionTextInputChange}
        maxLength={72}
        autoComplete="off"
      />
      <div className={classes["flex"]}>
        <div className={classes.center}>
          <p className={classes["semi-bold"]}>ניקוד</p>
          <RangeInput
            scoringWeight={currentQuestion.scoringWeight}
            handleQuestionScoringWeightChange={
              handleQuestionScoringWeightChange
            }
          />
        </div>
        <div className={classes["image-input-wrapper"]}>
          <ImageInput
            imageSrc={questionImage?.src ?? ""}
            imagePreview={questionImage?.image ?? ""}
            croppedAreaPixels={questionImage?.croppedAreaPixels ?? null}
            crop={questionImage?.crop ?? { x: 0, y: 0 }}
            zoom={questionImage?.zoom ?? 1}
            setImageDetails={updateQuestionImage}
            variant="question"
          />
        </div>
        <div className={classes.center}>
          <p className={classes["semi-bold"]}>כמות זמן</p>
          <SecondsCircleLayout
            items={[20, 30, 60, 90, 120, 240, 5, 10]}
            center={currentQuestion.timeLimit}
            onCenterChange={handleQuestionTimeLimitChange}
          />
        </div>
      </div>
      <AnswerOptionsInputList
        correctAnswerIndexes={currentQuestion.correctIndexes}
        answerTexts={currentQuestion.answerOptions}
        onAnswerClick={(index) => handleQuestionCorrectIndexesChange(index)}
        onAnswerTextChange={handleAnswerTextChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QuestionEditor;
