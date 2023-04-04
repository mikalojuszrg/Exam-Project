import {
  sortQuestionsByAnswersAsc,
  sortQuestionsByAnswersDesc,
  sortQuestionsByDateAsc,
  sortQuestionsByDateDesc,
} from "../../../utils/sortQuestions";

import Loader from "../../../components/Loader/Loader";
import { Question } from "../../../types/question";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./QuestionTimeline.module.scss";
import { useQuestions } from "../../../hooks/question";
import { useState } from "react";

const QuestionTimeline = () => {
  const { data, isLoading } = useQuestions();
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filter, setFilter] = useState("all");

  const questions = data || [];
  const sortedQuestionsByDateAsc = sortQuestionsByDateAsc(questions);
  const sortedQuestionsByDateDesc = sortQuestionsByDateDesc(questions);
  const sortedQuestionsByAnswersAsc = sortQuestionsByAnswersAsc(questions);
  const sortedQuestionsByAnswersDesc = sortQuestionsByAnswersDesc(questions);

  const handleSortBy = (sortType: string) => {
    if (sortBy === sortType) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortType);
      setSortOrder("asc");
    }
  };

  const handleFilterQuestions = () => {
    switch (filter) {
      case "answered":
        return sortBy === "answers"
          ? sortedQuestionsByAnswersDesc.filter(
              (question) => question.answerCount ?? 0 > 0
            )
          : sortedQuestionsByDateDesc.filter(
              (question) => question.answerCount ?? 0 > 0
            );
      case "unanswered":
        return sortBy === "answers"
          ? sortedQuestionsByAnswersAsc.filter(
              (question) => (question.answerCount ?? 0) === 0
            )
          : sortedQuestionsByDateAsc.filter(
              (question) => (question.answerCount ?? 0) === 0
            );
      default:
        return sortBy === "answers"
          ? sortedQuestionsByAnswersDesc
          : sortedQuestionsByDateDesc;
    }
  };

  const filteredQuestions = handleFilterQuestions();

  const finalQuestions =
    sortOrder === "desc" ? filteredQuestions.reverse() : filteredQuestions;

  return (
    <div className={styles.container}>
      <div className={styles.sortButtons}>
        <button onClick={() => handleSortBy("date-asc")}>
          Sort by date (asc)
        </button>
        <button onClick={() => handleSortBy("date-desc")}>
          Sort by date (desc)
        </button>
        <button onClick={() => handleSortBy("answers-desc")}>
          Sort by answer count (desc)
        </button>
        <button onClick={() => handleSortBy("answers-asc")}>
          Sort by answer count (asc)
        </button>
      </div>
      <div className={styles.filterButtons}>
        <button onClick={() => setFilter("all")}>All questions</button>
        <button onClick={() => setFilter("answered")}>
          Answered questions
        </button>
        <button onClick={() => setFilter("unanswered")}>
          Unanswered questions
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        finalQuestions.map((question: Question) => (
          <QuestionCard question={question} key={question._id} />
        ))
      )}
    </div>
  );
};

export default QuestionTimeline;
