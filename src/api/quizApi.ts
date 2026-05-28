import api from "./axios";

export const getOwnerQuizzes = async (userId: string) => {
  const response = await api.get(`/quiz/owner/${userId}`);
  return response.data;
};

export const getSharedQuizzes = async (userId: string) => {
  const response = await api.get(`/quiz/shared/${userId}`);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await api.delete(`/quiz/${quizId}`);
  return response.data;
};
