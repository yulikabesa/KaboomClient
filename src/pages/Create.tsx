import React, { useEffect, useState } from "react";
import NavigationMenu from "../components/menu/NavigationMenu";
import QuestionSlideList from "../components/create/Slides/QuestionSlideList";
import layoutClasses from "../components/UI/Layout.module.css";
import classes from "./Create.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  questionsReducer,
  createEmptyQuestion,
} from "../reducers/questionsReducer";
import Settings from "../components/create/Settings/Settings";
import type {
  QuestionDto,
  questionImageType,
  QuestionWarning,
  QuizDto,
  quizType,
  sharedWithType,
  User,
} from "../types/quiz";
import {
  createQuiz,
  deleteQuiz,
  getQuizById,
  updateQuiz,
} from "../api/quizApi";
import { useAuth } from "../store/AuthContext";
import Button from "../components/UI/Button";
import { useQuestionEditor } from "../hooks/useQuestionEditor";
import QuestionEditor from "../components/create/QuestionEdit/QuestionEditor";
import Loading from "../components/player/Loading";

const normalizeQuiz = (rawQuiz: QuizDto) => {
  const quiz = {
    ...rawQuiz,
    questions: rawQuiz.questions.map((q: QuestionDto) => ({
      ...q,
      questionImage: {
        image: q.questionImage ?? "",
        src: q.questionImage ?? "",
        crop: { x: 0, y: 0 },
        zoom: 1,
        croppedAreaPixels: null,
      },
    })),
  };
  return quiz as quizType;
};

const Create: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?._id;

  const { quizId } = useParams();
  const [loading, setLoading] = useState(!!quizId);

  useEffect(() => {
    if (!quizId) {
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      try {
        const quiz = normalizeQuiz(await getQuizById(quizId));
        dispatch({
          type: "SET_QUESTIONS",
          value:
            quiz.questions?.length > 0
              ? quiz.questions
              : [createEmptyQuestion()],
        });
        setCurrentQuestionBeingEdited(0);
        setQuizName(quiz.title ?? "");
        setSharedWith(quiz.sharedWith ?? []);
        setOwner(quiz.owner);
        setTags(quiz.tags ?? []);
        setCoverImage({
          image: quiz.coverImage ?? "",
          src: quiz.coverImage ?? "",
          crop: { x: 0, y: 0 },
          zoom: 1,
          croppedAreaPixels: null,
        });
      } catch (error) {
        console.error(error);
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId, navigate]);

  // states for questions and slides display
  const [questions, dispatch] = React.useReducer(questionsReducer, [
    createEmptyQuestion(),
  ]);
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
  const [quizName, setQuizName] = useState("");
  const [isQuizNameError, setIsQuizNameError] = useState(false);
  const [sharedWith, setSharedWith] = useState<sharedWithType[]>([]);
  const [owner, setOwner] = useState<User>();
  const [tags, setTags] = useState<string[]>([]);
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

  const getQuestionWarnings = (index: number): QuestionWarning => {
    const question = questions[index];
    const messages: string[] = [];
    if (!question.questionText.trim()) {
      messages.push("כותרת השאלה ריקה");
    }
    const emptyAnswerIndexes = question.answerOptions
      .map((answer: string, idx: number) => (!answer ? idx + 1 : null))
      .filter(Boolean);
    if (emptyAnswerIndexes.length > 0) {
      messages.push(
        `תשוב${emptyAnswerIndexes.length > 1 ? "ות" : "ה"} ${emptyAnswerIndexes.join(", ")} ${
          emptyAnswerIndexes.length > 1 ? "ריקות" : "ריקה"
        }`,
      );
    }
    if (question.correctIndexes.length === 0) {
      messages.push("לפחות תשובה אחת חייבת להיות נכונה");
    }
    return {
      hasWarning: messages.length > 0,
      messages,
    };
  };

  const slideWarnings = questions.map((_, index) => getQuestionWarnings(index));

  const deleteQuizHandler = async () => {
    try {
      if (quizId) {
        const response = await deleteQuiz(quizId);
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
      // coverImage: coverImage?.image ?? "",
      coverImage: "", // todo change to coverImage.image when fixing image type in database with s3
      title: quizName,
      questions: cleanedQuestions,
      sharedWith,
      tags,
    };
    try {
      const response = quizId
        ? await updateQuiz(quizId, quiz)
        : await createQuiz({ ...quiz, owner: userId ?? "" });
      console.log(response);
    } catch (error) {
      console.error("Error saving quiz:", error);
    } finally {
      navigate("/home");
    }
  };

  if (loading) {
    return (
      <div className={classes.background}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className={`${classes.background} ${layoutClasses.layout}`}>
        <NavigationMenu
          variant="create"
          onSettingsClick={toggleSettings}
          quizName={quizName}
          setQuizName={setQuizName}
          onQuizSave={quizSaveClickHandler}
          isQuizNameError={isQuizNameError}
          setIsQuizNameError={setIsQuizNameError}
        />
        <div className={`${classes["screen-items-flex"]}`}>
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
              slideWarnings={slideWarnings}
            />
            <Button
              className={classes["add-slide-btn"]}
              onClick={addEmptyQuestion}
            >
              הוסף שאלה
            </Button>
          </div>
          {/* question editing */}
          <QuestionEditor
            currentQuestion={currentQuestion}
            questionImage={questionImage}
            handleQuestionTextInputChange={handleQuestionTextInputChange}
            handleQuestionScoringWeightChange={
              handleQuestionScoringWeightChange
            }
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
            owner={owner ?? null}
            sharedWith={sharedWith}
            setSharedWith={setSharedWith}
            tags={tags}
            setTags={setTags}
            coverImage={coverImage}
            setCoverImage={updateCoverImage}
            // areAllFieldsFull={areAllFieldsFull}
            onQuizDelete={deleteQuizHandler}
            onQuizSave={quizSaveClickHandler}
            isQuizNameError={isQuizNameError}
            setIsQuizNameError={setIsQuizNameError}
          />
        )}
      </div>
    </>
  );
};

export default Create;
