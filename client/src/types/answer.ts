export type Answer = {
  answer: string;
  email: string;
  _id: string;
  answer_id: number;
  question_id: number;
  date: string;
  modified?: string;
};

export type NewAnswer = Omit<Answer, "_id">;
