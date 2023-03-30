import {
  createQuestion,
  deleteQuestion,
  fetchQuestions,
  updateQuestion,
} from "../api/question";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Question } from "../types/question";

const QUESTIONS = "QUESTIONS";

export const useCreateQuestion = () => {
  return useMutation(createQuestion);
};

export const useQuestions = () => {
  return useQuery([QUESTIONS], fetchQuestions);
};

export const useDeleteQuestion = () => {
  return useMutation(deleteQuestion);
};

export const useUpdateQuestion = () => {
  return useMutation(
    (updatedQuestion: Question) => {
      const { modified, ...data } = updatedQuestion; // Remove modified field
      return updateQuestion(updatedQuestion.id, {
        ...data,
        modified: Date.now().toString(),
      });
    },
    {
      mutationKey: [QUESTIONS, "updateQuestion"],
    }
  );
};
