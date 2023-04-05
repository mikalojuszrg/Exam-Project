import AnswerForm from "./QuestionForm/AnswerForm";
import AnswerTimeline from "./AnswerTimeline/AnswerTimeline";
import { Question } from "../../types/question";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import styles from "./Question.module.scss";
import { useParams } from "react-router-dom";
import { useQuestion } from "../../hooks/question";

const QuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuestion(parseInt(id || "0"));
  const question: Question | undefined = data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {question ? (
        <>
          <QuestionCard question={question} />
          <AnswerForm questionId={question.id} />
          <AnswerTimeline questionId={question.id} />
        </>
      ) : (
        <div>No question found</div>
      )}
    </div>
  );
};

export default QuestionPage;
