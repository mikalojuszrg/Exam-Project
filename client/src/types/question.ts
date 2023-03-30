export type Question = {
  content: string;
  first_name: string;
  last_name: string;
  date: string;
  _id: string;
  email: string;
  id: number;
  modified?: string;
};

export type NewQuestion = Omit<Question, "_id">;
