import type { Area, Point } from "react-easy-crop";

export type UserDetails = {
  name: string;
  email: string;
};

export type TagDetails = {
  name: string;
};

export type permissionType = "בעלים" | "עריכה" | "צפייה";

export type questionType = {
  _id: string;
  questionText: string;
  answerOptions: string[];
  correctIndexes: number[];
  scoringWeight: number;
  timeLimit: number;
  questionImage?: questionImageType;
};

export type questionImageType = {
  image: string;
  src: string;
  crop: Point;
  zoom: number;
  croppedAreaPixels: Area | null;
};

export type QuestionDto = {
  _id?: string;
  questionText: string;
  answerOptions: string[];
  correctIndexes: number[];
  scoringWeight: number;
  timeLimit: number;
  questionImage?: string;
};

export type sharedWithType = {
  permission: permissionType;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

export type quizDisplayType = {
  _id: string;
  title: string;
  coverImage: string;
  tags: string[];
  questionCount: number;
  canEdit: boolean;
};

export type quizType = {
  coverImage: string;
  owner: string;
  title: string;
  questions: questionType[];
  sharedWith: sharedWithType[];
  tags: string[];
  _id?: string;
};

export type QuizDto = {
  coverImage: string;
  owner: string;
  title: string;
  questions: QuestionDto[];
  sharedWith: sharedWithType[];
  tags: string[];
  _id?: string;
};

export type CreateQuizDto = Omit<QuizDto, "_id">;

export type UpdateQuizDto = Omit<CreateQuizDto, "owner">;
