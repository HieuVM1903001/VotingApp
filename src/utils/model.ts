export const OPTIONONE = "optionOne";
export const OPTIONTWO = "optionTwo";
export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL?: string | null;
  answers: UserAnswers;
  questions: string[];
}
interface UserAnswers {
  [key: string]: string;
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: Option;
  optionTwo: Option;
}
export interface Option {
  votes: string[];
  text: string;
}
export interface QuestionCreateModel {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}
export interface UserAnswer {
  userId: string;
  questionId: string;
  answer: string;
}
