import { useState, type ChangeEvent } from "react";
import NavigationMenu from "../components/NavigationMenu";
import QuestionSlideList from "../components/create/QuestionSlideList";
import ImageInput from "../components/create/ImageInput";
import type { AreaPixels } from "../components/create/ImageCrop";
import { getCroppedImg } from "../utils/cropImage";
import classes from "./Create.module.css";

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
  const [imagePreview, setImagePreview] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<AreaPixels | null>(
    null,
  );

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
    setImagePreview(file);
    setQuestions((prev) => {
      prev[currentQuestionEdited].questionImage = selectedImage;
      return prev;
    });
  };

  const handleCropComplete = (areaPixels: AreaPixels | null) => {
    setCroppedAreaPixels(areaPixels);
  };

  const handleSaveCropped = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    const cropped = await getCroppedImg(selectedImage, croppedAreaPixels);
    if (cropped) setImagePreview(cropped);
  };

  const handleDone = async () => {
    // send to backend
    const payload = {
      imageUrl: selectedImage,
      croppedAreaPixels,
      // optionally also send cropped
      // ... other fields
    };

    console.log("Payload:", payload);
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
        <ImageInput
          imageSrc={selectedImage}
          imagePreview={imagePreview}
          setImage={handleImageChange}
          handleCropComplete={handleCropComplete}
          handleSaveCropped={handleSaveCropped}
        />
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
