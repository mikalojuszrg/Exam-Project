import { Answer, NewAnswer } from "../types/answer";

import axios from "axios";

const ANSWERS_API_URL = "http://localhost:8080/questions";

export const createAnswer = async (
  questionId: number,
  answer: NewAnswer
): Promise<Answer> => {
  const response = await axios.post(
    `${ANSWERS_API_URL}/${questionId}/answers`,
    answer
  );
  return response.data;
};

export const fetchAnswers = async (questionId: number): Promise<Answer[]> => {
  const response = await axios.get(`${ANSWERS_API_URL}/${questionId}/answers`);
  return response.data;
};

export const updateAnswer = async (
  questionId: number,
  answerId: number,
  answer: Answer,
  email: string
): Promise<Answer> => {
  console.log(email);
  const { _id, ...data } = answer;
  const response = await axios.put(
    `${ANSWERS_API_URL}/${questionId}/answers/${answerId}`,
    { ...data, email, upvotedBy: answer.upvotedBy }
  );
  return response.data;
};

export const deleteAnswer = async (
  questionId: number,
  answerId: number
): Promise<void> => {
  await axios.delete(`${ANSWERS_API_URL}/${questionId}/answers/${answerId}`);
};
