import React, { useState, type ChangeEvent } from "react";
import NavigationMenu from "../components/NavigationMenu";
import QuestionSlideList from "../components/create/QuestionSlideList";
import ImageInput from "../components/create/ImageInput";
import getCroppedImg from "../utils/cropImage";
import type { Area } from "react-easy-crop";
import classes from "./Create.module.css";
import SecondsCircleLayout from "../components/create/SecondsCircleLayout";
import { useLocation } from "react-router-dom";
import AnswerOptionsInputList from "../components/create/AnswerOptionsInputList";
import {
  questionsReducer,
  createEmptyQuestion,
} from "../reducers/questionsReducer";
import RangeInput from "../components/create/RangeInput";

const Create: React.FC<{}> = () => {
  const location = useLocation();
  const data = location.state;

  const initialQuestions =
    Array.isArray(data) && data.length > 0 ? data : [createEmptyQuestion()];

  const [questions, dispatch] = React.useReducer(
    questionsReducer,
    initialQuestions,
  );

  const [currentQuestionBeingEdited, setCurrentQuestionBeingEdited] =
    useState(0);
  const scoringWeightOptions = [0.5, 1, 2];
  const currentQuestion = questions[currentQuestionBeingEdited];

  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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

  const handleAnswerTextChange = (answerIndex: number, value: string) => {
    dispatch({
      type: "SET_ANSWER_OPTION",
      questionIndex: currentQuestionBeingEdited,
      answerIndex,
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

  const handleImageChange = (file: string) => {
    setSelectedImage(file);
    setImagePreview(file);
    setCroppedAreaPixels(null);
    // todo: set in reducer
  };

  const handleCropComplete = (areaPixels: Area | null) => {
    setCroppedAreaPixels(areaPixels);
  };

  const handleSaveCropped = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    const cropped = (await getCroppedImg(
      selectedImage,
      croppedAreaPixels,
    )) as string;
    if (cropped) setImagePreview(cropped);
  };

  // const handleDone = async () => {
  //   // send to backend
  //   const payload = {
  //     imageUrl: selectedImage,
  //     croppedAreaPixels,
  //     // optionally also send cropped
  //     // ... other fields
  //   };
  //   console.log("Payload:", payload);
  // };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    dispatch({
      type: "REORDER_QUESTIONS",
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    });

    setCurrentQuestionBeingEdited(result.destination.index);
  };

  const onDragStart = (result: any) => {
    setCurrentQuestionBeingEdited(result.source.index);
  };

  return (
    <div className={classes.background}>
      <NavigationMenu variant="create" />
      {/* question editing */}
      <div className={classes["question-editing"]}>
        <input
          id="question-text"
          type="text"
          placeholder="הקלד כאן את השאלה שלך…"
          className={classes["question-text-input"]}
          value={currentQuestion.questionText}
          onChange={handleQuestionTextInputChange}
          maxLength={72}
        />
        <div className={classes["flex"]}>
          <RangeInput
            scoringWeight={currentQuestion.scoringWeight}
            handleQuestionScoringWeightChange={
              handleQuestionScoringWeightChange
            }
          />
          <ImageInput
            imageSrc={selectedImage}
            imagePreview={imagePreview}
            setImage={handleImageChange}
            croppedAreaPixels={croppedAreaPixels}
            handleCropComplete={handleCropComplete}
            handleSaveCropped={handleSaveCropped}
          />
          <SecondsCircleLayout
            items={[20, 30, 60, 90, 120, 240, 5, 10]}
            center={currentQuestion.timeLimit}
            onCenterChange={handleQuestionTimeLimitChange}
          />
        </div>
        <AnswerOptionsInputList
          correctAnswerIndexes={currentQuestion.correctIndexes}
          answerTexts={currentQuestion.answerOptions}
          onAnswerClick={(index) => handleQuestionCorrectIndexesChange(index)}
          onAnswerTextChange={handleAnswerTextChange}
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
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        />
        <div className={classes["blue-btn"]} onClick={addEmptyQuestion}>
          הוסף שאלה
        </div>
      </div>
    </div>
  );
};

export default Create;
