import React, { useState, type ChangeEvent } from "react";
import NavigationMenu from "../components/menu/NavigationMenu";
import QuestionSlideList from "../components/create/Slides/QuestionSlideList";
import ImageInput from "../components/create/Image/ImageInput";
import getCroppedImg from "../utils/cropImage";
import type { Area } from "react-easy-crop";
import classes from "./Create.module.css";
import SecondsCircleLayout from "../components/create/Inputs/SecondsCircleLayout";
import { useLocation } from "react-router-dom";
import AnswerOptionsInputList from "../components/create/Inputs/AnswerOptionsInputList";
import {
  questionsReducer,
  createEmptyQuestion,
} from "../reducers/questionsReducer";
import RangeInput from "../components/create/Inputs/RangeInput";
import Settings from "../components/create/Settings/Settings";

const Create: React.FC<{}> = () => {
  const location = useLocation();
  const data = location.state;

  const initialQuestions =
    Array.isArray(data.questions) && data.questions.length > 0
      ? data.questions
      : [createEmptyQuestion()];

  const [questions, dispatch] = React.useReducer(
    questionsReducer,
    initialQuestions,
  );

  const [currentQuestionBeingEdited, setCurrentQuestionBeingEdited] =
    useState(0);
  const scoringWeightOptions = [0.5, 1, 2];
  const currentQuestion = questions[currentQuestionBeingEdited];
  const questionImage = currentQuestion?.questionImage;

  const [settingsDisplay, setSettingsDisplay] = useState(false);
  const [quizName, setQuizName] = useState("");

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
    const updates = {
      src: file,
      image: file,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
    };

    dispatch({
      type: "SET_IMAGE_DETAILS",
      payload: {
        index: currentQuestionBeingEdited,
        updates: updates,
      },
    });
  };

  const handleCropComplete = (areaPixels: Area | null) => {
    dispatch({
      type: "SET_IMAGE_DETAILS",
      payload: {
        index: currentQuestionBeingEdited,
        updates: { croppedAreaPixels: areaPixels },
      },
    });
  };

  const handleSaveCropped = async () => {
    if (!questionImage?.src || !questionImage?.croppedAreaPixels) return;
    const cropped = (await getCroppedImg(
      questionImage.src,
      questionImage.croppedAreaPixels,
    )) as string;
    if (cropped)
      dispatch({
        type: "SET_IMAGE_DETAILS",
        payload: {
          index: currentQuestionBeingEdited,
          updates: { image: cropped },
        },
      });
  };

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

  const toggleSettings = () => {
    setSettingsDisplay((prev) => !prev);
  };

  return (
    <div className={classes.background}>
      <NavigationMenu
        variant="create"
        onSettingsClick={toggleSettings}
        quizName={quizName}
        setQuizName={setQuizName}
      />
      <div className={classes["screen-items-flex"]}>
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
            <div className={classes.center}>
              <p className={classes["semi-bold"]}>ניקוד</p>
              <RangeInput
                scoringWeight={currentQuestion.scoringWeight}
                handleQuestionScoringWeightChange={
                  handleQuestionScoringWeightChange
                }
              />
            </div>
            <ImageInput
              imageSrc={questionImage?.src ?? ""}
              imagePreview={questionImage?.image ?? ""}
              setImage={handleImageChange}
              croppedAreaPixels={questionImage?.croppedAreaPixels ?? null}
              crop={questionImage?.crop ?? { x: 0, y: 0 }}
              zoom={questionImage?.zoom ?? 1}
              setCrop={(crop) =>
                dispatch({
                  type: "SET_IMAGE_DETAILS",
                  payload: {
                    index: currentQuestionBeingEdited,
                    updates: { crop },
                  },
                })
              }
              setZoom={(zoom) =>
                dispatch({
                  type: "SET_IMAGE_DETAILS",
                  payload: {
                    index: currentQuestionBeingEdited,
                    updates: { zoom },
                  },
                })
              }
              handleCropComplete={handleCropComplete}
              handleSaveCropped={handleSaveCropped}
            />
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

      {settingsDisplay && (
        <Settings
          closeOverlay={toggleSettings}
          quizName={quizName}
          setQuizName={setQuizName}
        />
      )}
    </div>
  );
};

export default Create;
