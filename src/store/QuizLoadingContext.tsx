import { createContext, useContext } from "react";

const QuizLoadingContext = createContext(false);

export const useQuizLoading = () => useContext(QuizLoadingContext);
export default QuizLoadingContext;
