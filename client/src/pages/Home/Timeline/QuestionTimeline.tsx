import Loader from "../../../components/Loader/Loader";
import { Question } from "../../../types/question";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import { reverseArray } from "../../../utils/reverseArray";
import styles from "./QuestionTimeline.module.scss";
import { useQuestions } from "../../../hooks/question";

const QuestionTimeLine = () => {
  const { data, isLoading } = useQuestions();
  const questions = data || [];

  const reversedQuestions = reverseArray(questions);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        reversedQuestions.map((question: Question) => (
          <QuestionCard question={question} key={question._id} />
        ))
      )}
    </div>
  );
};

export default QuestionTimeLine;
