import type { CreateQuizDto, UpdateQuizDto } from "../types/quiz";
import api from "./axios";

export const getQuizById = async (quizId: string) => {
  const response = await api.get(`/quiz/${quizId}`);
  return response.data.data.quiz;
};

export const getOwnedQuizzes = async () => {
  const response = await api.get(`/quiz/owner/`);
  return response.data;
};

export const getSharedQuizzes = async () => {
  const response = await api.get(`/quiz/shared/`);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await api.delete(`/quiz/${quizId}`);
  return response.data;
};

export const createQuiz = async (quiz: CreateQuizDto) => {
  const response = await api.post(`/quiz/`, quiz);
  return response.data;
};

export const updateQuiz = async (
  quizId: string | undefined,
  quiz: UpdateQuizDto,
) => {
  if (!quizId) return "no quiz id";
  const response = await api.patch(`/quiz/${quizId}`, quiz);
  return response.data;
};
