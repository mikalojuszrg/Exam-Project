import AnswerForm from "./QuestionForm/AnswerForm";
import AnswerTimeline from "./AnswerTimeline/AnswerTimeline";
import { Question } from "../../types/question";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import { useParams } from "react-router-dom";
import { useQuestion } from "../../hooks/question";

const QuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useQuestion(parseInt(id || "0"));
  const question: Question | undefined = data;

  const handleRefetchAnswers = async () => {
    await refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
