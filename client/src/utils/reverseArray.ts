import { Answer } from "../types/answer";
import { Question } from "../types/question";

export const reverseArray = (arr: Array<Question | Answer>) => {
  return [...arr].reverse();
};
