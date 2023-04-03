import { Question } from "../types/question";

export const sortQuestions = (
  questions: Question[],
  sortBy: string,
  sortOrder: string
) => {
  const sortedQuestions = [...questions];
  let ascending = sortOrder === "asc";
  switch (sortBy) {
    case "answers":
      sortedQuestions.sort((a, b) => {
        const answersA = a.answersCount || 0;
        const answersB = b.answersCount || 0;
        if (ascending) {
          return answersA - answersB;
        } else {
          return answersB - answersA;
        }
      });
      break;
    case "date":
      sortedQuestions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (ascending) {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
      ascending = !ascending; // toggle sort order
      break;
    default:
      sortedQuestions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      break;
  }
  return sortedQuestions;
};
