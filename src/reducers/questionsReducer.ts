import type { questionType } from "../components/ProductsList";

export type QuestionsAction =
  | { type: "SET_QUESTION_TEXT"; index: number; value: string }
  | { type: "SET_TIME_LIMIT"; index: number; value: number }
  | { type: "SET_SCORING_WEIGHT"; index: number; value: number }
  | { type: "TOGGLE_CORRECT_INDEX"; index: number; value: number }
  | { type: "ADD_QUESTION" }
  | { type: "DELETE_QUESTION"; index: number }
  | { type: "COPY_QUESTION"; index: number }
  | { type: "SET_QUESTIONS"; value: questionType[] };

export const createEmptyQuestion = (): questionType => ({
  questionText: "",
  answerOptions: ["", ""],
  correctIndexes: [0],
  timeLimit: 20,
  scoringWeight: 1,
  questionImage: "",
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

    case "ADD_QUESTION":
      return [...state, createEmptyQuestion()];

    case "COPY_QUESTION": {
      const updated = [...state];
      const originalQuestion = updated[action.index];

      const copy: questionType = {
        ...originalQuestion,
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
