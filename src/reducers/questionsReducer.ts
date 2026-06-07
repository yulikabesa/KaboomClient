import type { questionImageType, questionType } from "../types/quiz";

export type QuestionsAction =
  | { type: "SET_QUESTION_TEXT"; index: number; value: string }
  | { type: "SET_TIME_LIMIT"; index: number; value: number }
  | { type: "SET_SCORING_WEIGHT"; index: number; value: number }
  | {
      type: "SET_IMAGE_DETAILS";
      payload: { index: number; updates: Partial<questionImageType> };
    }
  | { type: "TOGGLE_CORRECT_INDEX"; index: number; value: number }
  | { type: "ADD_QUESTION" }
  | { type: "DELETE_QUESTION"; index: number }
  | { type: "COPY_QUESTION"; index: number }
  | { type: "SET_QUESTIONS"; value: questionType[] }
  | {
      type: "SET_ANSWER_OPTION";
      questionIndex: number;
      answerIndex: number;
      value: string;
    }
  | {
      type: "REORDER_QUESTIONS";
      sourceIndex: number;
      destinationIndex: number;
    };

export const createEmptyQuestion = (): questionType => ({
  _id: crypto.randomUUID(),
  questionText: "",
  answerOptions: ["", ""],
  correctIndexes: [],
  timeLimit: 20,
  scoringWeight: 1,
  questionImage: {
    image: "",
    src: "",
    crop: { x: 0, y: 0 },
    zoom: 1,
    croppedAreaPixels: null,
  },
});

export function questionsReducer(
  state: questionType[],
  action: QuestionsAction,
): questionType[] {
  switch (action.type) {
    case "SET_QUESTION_TEXT": {
      const updated = [...state];
      updated[action.index] = {
        ...updated[action.index],
        questionText: action.value,
      };
      return updated;
    }

    case "SET_TIME_LIMIT": {
      const updated = [...state];
      updated[action.index] = {
        ...updated[action.index],
        timeLimit: action.value,
      };
      return updated;
    }

    case "SET_SCORING_WEIGHT": {
      const updated = [...state];
      updated[action.index] = {
        ...updated[action.index],
        scoringWeight: action.value,
      };
      return updated;
    }

    case "SET_IMAGE_DETAILS": {
      const updated = [...state];
      const updates = action.payload.updates;
      let question = updated[action.payload.index];
      const questionImage = question.questionImage;

      if (questionImage)
        updated[action.payload.index] = {
          ...question,
          questionImage: { ...questionImage, ...updates },
        };

      return updated;
    }

    case "TOGGLE_CORRECT_INDEX": {
      const updated = [...state];
      const q = updated[action.index];

      const newCorrectIndexes = q.correctIndexes.includes(action.value)
        ? q.correctIndexes.filter((i) => i !== action.value)
        : [...q.correctIndexes, action.value];

      updated[action.index] = {
        ...q,
        correctIndexes: newCorrectIndexes,
      };

      return updated;
    }

    case "SET_ANSWER_OPTION": {
      const updated = [...state];
      const question = updated[action.questionIndex];

      const newAnswerOptions = [...question.answerOptions];

      // update value
      newAnswerOptions[action.answerIndex] = action.value;

      // remove trailing empty answers
      while (
        newAnswerOptions.length > 0 &&
        (newAnswerOptions[newAnswerOptions.length - 1] ?? "").trim() === ""
      ) {
        newAnswerOptions.pop();
      }

      // remove correct indexes that no longer exist
      const newCorrectIndexes = question.correctIndexes.filter(
        (index) =>
          index < newAnswerOptions.length &&
          (newAnswerOptions[index] ?? "").trim() !== "",
      );

      updated[action.questionIndex] = {
        ...question,
        answerOptions: newAnswerOptions,
        correctIndexes: newCorrectIndexes,
      };

      return updated;
    }

    case "REORDER_QUESTIONS": {
      const updated = [...state];

      const [removed] = updated.splice(action.sourceIndex, 1);

      updated.splice(action.destinationIndex, 0, removed);

      return updated;
    }

    case "ADD_QUESTION":
      return [...state, createEmptyQuestion()];

    case "COPY_QUESTION": {
      const updated = [...state];
      const originalQuestion = updated[action.index];
      const copy: questionType = {
        ...originalQuestion,
        _id: crypto.randomUUID(),
        answerOptions: [...originalQuestion.answerOptions],
        correctIndexes: [...originalQuestion.correctIndexes],
      };
      updated.splice(action.index + 1, 0, copy);
      return updated;
    }

    case "DELETE_QUESTION": {
      const updated = [...state];
      updated.splice(action.index, 1);
      return updated.length > 0 ? updated : [createEmptyQuestion()];
    }

    case "SET_QUESTIONS":
      return action.value;

    default:
      return state;
  }
}
