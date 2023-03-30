import { useParams } from "react-router-dom";
import { useQuestion } from "../../hooks/question";

type QuestionPreview = {
  title: string;
  content: string;
};

const Question = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuestion(parseInt(id || "0"));
  const question: QuestionPreview = data || { title: "", content: "" };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.content}</p>
    </div>
  );
};

export default Question;
