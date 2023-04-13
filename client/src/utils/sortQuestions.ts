import { Question } from "../types/question";

export const sortQuestionsByDateAsc = (questions: Question[]) => {
  const sortedQuestions = [...questions];
  sortedQuestions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  return sortedQuestions;
};

export const sortQuestionsByDateDesc = (questions: Question[]) => {
  const sortedQuestions = [...questions];
  sortedQuestions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  return sortedQuestions;
};

export const sortQuestionsByAnswersDesc = (questions: Question[]) => {
  const sortedQuestions = [...questions];
  sortedQuestions.sort((a, b) => {
    const answersA = a.answerCount || 0;
    const answersB = b.answerCount || 0;
    return answersB - answersA;
  });
  return sortedQuestions;
};

export const sortQuestionsByAnswersAsc = (questions: Question[]) => {
  const sortedQuestions = [...questions];
  sortedQuestions.sort((a, b) => {
    const answersA = a.answerCount || 0;
    const answersB = b.answerCount || 0;
    return answersA - answersB;
  });
  return sortedQuestions;
};
