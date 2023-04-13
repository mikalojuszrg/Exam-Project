import { NewQuestion, Question } from "../types/question";

import axios from "axios";

const QUESTIONS_API_URL = "http://localhost:8080/questions";

export const createQuestion = async (
  question: NewQuestion
): Promise<Question> => {
  const response = await axios.post(QUESTIONS_API_URL, question);
  return response.data;
};

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await axios.get(QUESTIONS_API_URL);
  return response.data;
};

export const fetchQuestion = async (id: number): Promise<Question> => {
  const response = await axios.get(`${QUESTIONS_API_URL}/${id}`);
  return response.data;
};

export const deleteQuestion = async (id: number): Promise<Question> => {
  const response = await axios.delete(`${QUESTIONS_API_URL}/${id}`);
  return response.data;
};

export const updateQuestion = async (id: number, question: Question) => {
  try {
    const { _id, ...data } = question; // Remove _id field
    const modified = new Date().toString(); // Add modified property
    const response = await axios.put(`${QUESTIONS_API_URL}/${id}`, {
      ...data,
      modified,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
