import Loader from "../../../components/Loader/Loader";
import { Question } from "../../../types/question";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import { reverseArray } from "../../../utils/reverseArray";
import styles from "./Timeline.module.scss";
import { useQuestions } from "../../../hooks/question";

const TimeLine = () => {
  const { data, isLoading } = useQuestions();
  const posts = data || [];

  const reversedPosts = reverseArray(posts);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        reversedPosts.map((question: Question) => (
          <QuestionCard question={question} key={question._id} />
        ))
      )}
    </div>
  );
};

export default TimeLine;
