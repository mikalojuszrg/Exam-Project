import { Answer } from "../../../types/answer";
import AnswerCard from "../../../components/AnswerCard/AnswerCard";
import Loader from "../../../components/Loader/Loader";
import styles from "./AnswerTimeline.module.scss";
import { useAnswers } from "../../../hooks/answer";

type Props = {
  questionId: number;
};

const AnswerTimeline = ({ questionId }: Props) => {
  const { data, isLoading } = useAnswers(questionId);
  const answers = data || [];

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        answers.map((answer: Answer) => (
          <AnswerCard
            answer={answer}
            questionId={questionId}
            key={answer._id}
          />
        ))
      )}
    </div>
  );
};

export default AnswerTimeline;
