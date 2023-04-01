import AnswerForm from "./QuestionForm/AnswerForm";
import { useParams } from "react-router-dom";
import { useQuestion } from "../../hooks/question";

type QuestionPreview = {
  title: string;
  content: string;
  id: number;
};

const Question = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useQuestion(parseInt(id || "0"));
  const question: QuestionPreview = data || { title: "", content: "", id: 0 };

  const handleRefetchAnswers = async () => {
    await refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.content}</p>
      <AnswerForm
        questionId={question.id}
        refetchAnswers={handleRefetchAnswers}
      />
    </div>
  );
};

export default Question;
