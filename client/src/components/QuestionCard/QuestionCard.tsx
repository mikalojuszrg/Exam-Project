import { useContext, useState } from "react";
import {
  useDeleteQuestion,
  useQuestions,
  useUpdateQuestion,
} from "../../hooks/question";

import { AiOutlineDelete } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { QUESTION_PATH } from "../../consts/paths";
import { Question } from "../../types/question";
import { UserContext } from "../../contexts/UserContext";
import { formatDate } from "../../utils/formatDate";
import styles from "./QuestionCard.module.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  question: Question;
};

const QuestionCard: React.FC<Props> = ({ question }) => {
  const answerCount = question.answerCount;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { email } = user ?? {};
  const { mutateAsync: deletePost } = useDeleteQuestion();
  const { refetch } = useQuestions();
  const { mutateAsync: updateQuestion } = useUpdateQuestion();
  const loggedUserPost = question.email === email;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(question.content);
  const [updatedTitle, setUpdatedTitle] = useState(question.title);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await deletePost(id);
    await refetch();
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const updatedQuestion = {
      ...question,
      date: new Date().toString(),
      title: updatedTitle,
      content: updatedContent,
    };
    updatedQuestion.id = question.id;
    await updateQuestion(updatedQuestion);
    await refetch();
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleTitleClick = () => {
    navigate(`${question.id}`);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.container}>
          <div className={styles.container__title}>
            <FaUserCircle
              className={
                loggedUserPost
                  ? styles.container__logged
                  : styles.container__unlogged
              }
            />
            <p className={styles.container__name}>
              {question.first_name} {question.last_name}
            </p>
            {loggedUserPost && (
              <>
                {isEditing ? (
                  <>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                    <button onClick={handleUpdate}>Save</button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <AiOutlineDelete
                  className={styles.container__deletebtn}
                  onClick={() => handleDelete(question.id)}
                />
              </>
            )}
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 onClick={handleTitleClick}>{question.title}</h2>
              <p className={styles.container__content}>{question.content}</p>
              <p>
                {question.answerCount}{" "}
                {question.answerCount === 1 ? "answer" : "answers"}
              </p>
            </>
          )}
          <p>
            {question.modified
              ? `Last modified: ${formatDate(question.date)}`
              : formatDate(question.date)}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
