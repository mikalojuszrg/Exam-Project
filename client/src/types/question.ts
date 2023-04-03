export type Question = {
  content: string;
  title: string;
  first_name: string;
  last_name: string;
  date: string;
  _id: string;
  email: string;
  id: number;
  modified?: string;
  answersCount?: number;
  answerCount: number;
};

export type NewQuestion = Omit<Question, "_id">;
