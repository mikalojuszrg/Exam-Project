import {
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineSave,
  AiOutlineUndo,
} from "react-icons/ai";
import { HOME_PATH, QUESTION_PATH } from "../../consts/paths";
import { useContext, useState } from "react";
import {
  useDeleteQuestion,
  useQuestions,
  useUpdateQuestion,
} from "../../hooks/question";
import { useLocation, useNavigate } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { Question } from "../../types/question";
import { UserContext } from "../../contexts/UserContext";
import { formatDate } from "../../utils/formatDate";
import styles from "./QuestionCard.module.scss";

type Props = {
  question: Question;
};

const QuestionCard: React.FC<Props> = ({ question }) => {
  const answerCount = question.answerCount;
  const location = useLocation();
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
            {loggedUserPost && (
              <>
                {isEditing ? (
                  <>
                    <AiOutlineUndo
                      className={styles.container__icon}
                      onClick={() => setIsEditing(false)}
                    />
                    <AiOutlineSave
                      className={styles.container__icon}
                      onClick={handleUpdate}
                    />
                  </>
                ) : (
                  <AiFillEdit
                    className={styles.container__icon}
                    onClick={() => setIsEditing(true)}
                  />
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
                className={styles.container__input}
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <textarea
                className={styles.container__input}
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 className={styles.container__name} onClick={handleTitleClick}>
                {question.title}
              </h2>
              <p className={styles.container__content}>{question.content}</p>
              {location.pathname === HOME_PATH ? (
                <p>
                  {question.answerCount}{" "}
                  {question.answerCount === 1 ? "answer" : "answers"}
                </p>
              ) : (
                <></>
              )}

              <div className={styles.container__user}>
                <FaUserCircle
                  className={
                    loggedUserPost
                      ? styles.container__logged
                      : styles.container__unlogged
                  }
                />
                <p className={styles.container__name}>{question.email}</p>
              </div>
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
