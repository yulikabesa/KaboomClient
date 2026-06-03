import React, { useState } from "react";
import NavigationMenu from "../components/menu/NavigationMenu";
import QuestionSlideList from "../components/create/Slides/QuestionSlideList";
import classes from "./Create.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  questionsReducer,
  createEmptyQuestion,
} from "../reducers/questionsReducer";
import Settings from "../components/create/Settings/Settings";
import type {
  quizType,
  questionImageType,
  sharedWithType,
} from "../types/quiz";
import { createQuiz, deleteQuiz, updateQuiz } from "../api/quizApi";
import { useAuth } from "../store/AuthContext";
import { useQuestionEditor } from "../hooks/useQuestionEditor";
import QuestionEditor from "../components/create/QuestionEdit/QuestionEditor";

const Create: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?._id;

  const location = useLocation();
  const data: quizType = location.state;

  // states for questions and slides display
  const initialQuestions =
    Array.isArray(data?.questions) && data?.questions.length > 0
      ? data?.questions
      : [createEmptyQuestion()];
  const [questions, dispatch] = React.useReducer(
    questionsReducer,
    initialQuestions,
  );
  const [currentQuestionBeingEdited, setCurrentQuestionBeingEdited] =
    useState(0);
  const currentQuestion = questions[currentQuestionBeingEdited];
  const questionImage = currentQuestion?.questionImage;

  // use question editing hook
  const {
    handleQuestionTextInputChange,
    handleQuestionTimeLimitChange,
    handleAnswerTextChange,
    handleQuestionCorrectIndexesChange,
    handleQuestionScoringWeightChange,
    updateQuestionImage,
  } = useQuestionEditor(dispatch, currentQuestionBeingEdited);

  // states for settings
  const [settingsDisplay, setSettingsDisplay] = useState(false);
  const [quizName, setQuizName] = useState(data?.title ?? "");
  const [sharedWith, setSharedWith] = useState<sharedWithType[]>(
    data?.sharedWith ?? [],
  );
  const [tags, setTags] = useState<string[]>(data?.tags ?? []);
  const [coverImage, setCoverImage] = useState<questionImageType>({
    image: "",
    src: "",
    crop: { x: 0, y: 0 },
    zoom: 1,
    croppedAreaPixels: null,
  });

  // functions
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

  const updateCoverImage = (updates: Partial<questionImageType>) => {
    setCoverImage((prev) => ({
      ...prev,
      ...updates,
    }));
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

  const areAllFieldsFull = () => {
    if (!quizName.trim()) return false;
    return questions.every((q) => {
      const hasQuestion = q.questionText.trim() !== "";
      const hasAnswers = q.answerOptions.every((a: any) => a);
      return hasQuestion && hasAnswers;
    });
  };

  const deleteQuizHandler = async () => {
    try {
      if (data?._id) {
        const response = await deleteQuiz(data._id);
        console.log(response);
      }
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const quizSaveClickHandler = async () => {
    const cleanedQuestions = questions.map(
      ({ _id, questionImage, ...question }) => ({
        ...question,
        questionImage: questionImage?.image ?? "",
      }),
    );
    const quiz = {
      coverImage: "",
      title: quizName,
      questions: cleanedQuestions,
      sharedWith,
      tags,
    };
    try {
      const response = data
        ? await updateQuiz(data._id, quiz)
        : await createQuiz({ ...quiz, owner: userId ?? "" });
      console.log(response);
    } catch (error) {
      console.error("Error saving quiz:", error);
    } finally {
      navigate("/home");
    }
  };

  return (
    <div className={classes.background}>
      <NavigationMenu
        variant="create"
        onSettingsClick={toggleSettings}
        quizName={quizName}
        setQuizName={setQuizName}
        onQuizSave={quizSaveClickHandler}
      />
      <div className={classes["screen-items-flex"]}>
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
        {/* question editing */}
        <QuestionEditor
          currentQuestion={currentQuestion}
          questionImage={questionImage}
          handleQuestionTextInputChange={handleQuestionTextInputChange}
          handleQuestionScoringWeightChange={handleQuestionScoringWeightChange}
          handleQuestionTimeLimitChange={handleQuestionTimeLimitChange}
          handleQuestionCorrectIndexesChange={
            handleQuestionCorrectIndexesChange
          }
          handleAnswerTextChange={handleAnswerTextChange}
          updateQuestionImage={updateQuestionImage}
        />
      </div>

      {settingsDisplay && (
        <Settings
          closeOverlay={toggleSettings}
          quizName={quizName}
          setQuizName={setQuizName}
          sharedWith={sharedWith}
          setSharedWith={setSharedWith}
          tags={tags}
          setTags={setTags}
          coverImage={coverImage}
          setCoverImage={updateCoverImage}
          areAllFieldsFull={areAllFieldsFull}
          onQuizDelete={deleteQuizHandler}
          onQuizSave={quizSaveClickHandler}
        />
      )}
    </div>
  );
};

export default Create;
