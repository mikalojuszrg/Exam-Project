import { Question } from "../types/question";

export const reverseArray = (arr: Question[]) => {
  return [...arr].reverse();
};
