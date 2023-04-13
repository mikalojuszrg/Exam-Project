import {
  sortQuestionsByAnswersAsc,
  sortQuestionsByAnswersDesc,
  sortQuestionsByDateAsc,
  sortQuestionsByDateDesc,
} from "../../../utils/sortQuestions";

import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";
import { Question } from "../../../types/question";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import { reverseArray } from "../../../utils/reverseArray";
import styles from "./QuestionTimeline.module.scss";
import { useQuestions } from "../../../hooks/question";
import { useState } from "react";

const QuestionTimeline = () => {
  const { data, isLoading } = useQuestions();
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("all");
  const questions = data || [];
  const reversedQuestions = reverseArray(questions);
  const sortedQuestionsByDateAsc = sortQuestionsByDateAsc(reversedQuestions);
  const sortedQuestionsByDateDesc = sortQuestionsByDateDesc(reversedQuestions);
  const sortedQuestionsByAnswersDesc =
    sortQuestionsByAnswersDesc(reversedQuestions);
  const sortedQuestionsByAnswersAsc =
    sortQuestionsByAnswersAsc(reversedQuestions);

  const handleSortByDate = () => {
    if (sortBy === "date") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy("date");
      setSortOrder("asc");
    }
  };

  const handleSortByAnswers = () => {
    if (sortBy === "answers") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy("answers");
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

  const sortedQuestions =
    sortOrder === "desc" ? reverseArray(filteredQuestions) : filteredQuestions;

  return (
    <div className={styles.container}>
      <div className={styles.container__sort}>
        <Button variant="tertiary" onClick={handleSortByDate}>
          Sort by date
        </Button>
        <Button variant="tertiary" onClick={handleSortByAnswers}>
          Sort by answer count
        </Button>
      </div>
      <div className={styles.container__filter}>
        <Button variant="tertiary" onClick={() => setFilter("all")}>
          All questions
        </Button>
        <Button variant="tertiary" onClick={() => setFilter("answered")}>
          Answered questions
        </Button>
        <Button variant="tertiary" onClick={() => setFilter("unanswered")}>
          Unanswered questions
        </Button>
      </div>
      <div className={styles.container__questions}>
        {isLoading ? (
          <Loader />
        ) : (
          sortedQuestions.map((question: Question) => (
            <QuestionCard question={question} key={question._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionTimeline;
