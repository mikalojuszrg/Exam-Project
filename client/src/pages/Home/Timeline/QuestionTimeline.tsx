import Loader from "../../../components/Loader/Loader";
import { Question } from "../../../types/question";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import { reverseArray } from "../../../utils/reverseArray";
import { sortQuestions } from "../../../utils/sortQuestions";
import styles from "./QuestionTimeline.module.scss";
import { useQuestions } from "../../../hooks/question";
import { useState } from "react";

const QuestionTimeLine = () => {
  const { data, isLoading } = useQuestions();
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filter, setFilter] = useState("all");
  const questions = data || [];
  const reversedQuestions = reverseArray(questions);
  const sortedQuestions = sortQuestions(reversedQuestions, sortBy, sortOrder);

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
        return sortedQuestions.filter(
          (question) => question.answerCount ?? 0 > 0
        );
      case "unanswered":
        return sortedQuestions.filter(
          (question) => (question.answerCount ?? 0) === 0
        );
      default:
        return sortedQuestions;
    }
  };

  const filteredQuestions = handleFilterQuestions();

  // Apply reverse sorting if sortOrder is "desc"
  const finalQuestions =
    sortOrder === "desc" ? reverseArray(filteredQuestions) : filteredQuestions;

  return (
    <div className={styles.container}>
      <div className={styles.sortButtons}>
        <button onClick={handleSortByDate}>Sort by date</button>
        <button onClick={handleSortByAnswers}>Sort by answers</button>
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

export default QuestionTimeLine;
