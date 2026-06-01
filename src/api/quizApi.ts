import type { quizType } from "../types/quiz";
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

export const createQuiz = async (quiz: quizType) => {
  const response = await api.post(`/quiz/`, quiz);
  return response.data;
};

export const updateQuiz = async (quizId: string | undefined, quiz: quizType) => {
  if (!quizId) return "no quiz id";
  const response = await api.patch(`/quiz/${quizId}`, quiz);
  return response.data;
};
