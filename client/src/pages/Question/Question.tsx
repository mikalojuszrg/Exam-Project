import { useParams } from "react-router-dom";

const Question = () => {
  const { id } = useParams();
  return <div>Question{id}</div>;
};

export default Question;
