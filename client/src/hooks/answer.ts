import { Answer, NewAnswer } from "../types/answer";
import {
  createAnswer,
  deleteAnswer,
  fetchAnswers,
  updateAnswer,
} from "../api/answer";
import { useMutation, useQuery } from "@tanstack/react-query";

const ANSWERS = "ANSWERS";

export const useCreateAnswer = () => {
  return useMutation((data: { questionId: number; answer: NewAnswer }) =>
    createAnswer(data.questionId, data.answer)
  );
};

export const useAnswers = (questionId: number) => {
  return useQuery([ANSWERS, questionId], () => fetchAnswers(questionId));
};

export const useDeleteAnswer = () => {
  return useMutation((ids: [number, number]) => deleteAnswer(ids[0], ids[1]));
};

export const useUpdateAnswer = () => {
  return useMutation(
    (updatedAnswer: Answer) =>
      updateAnswer(
        updatedAnswer.question_id,
        updatedAnswer.answer_id,
        updatedAnswer
      ),
    {
      mutationKey: [ANSWERS, "updateAnswer"],
    }
  );
};
