export type Answer = {
  answer: string;
  email: string;
  _id: string;
  answer_id: number;
  question_id: number;
  date: string;
  modified?: string;
  upvotedBy: string[];
  upvote: number;
  downvote: number;
};

export type NewAnswer = Omit<Answer, "_id">;
