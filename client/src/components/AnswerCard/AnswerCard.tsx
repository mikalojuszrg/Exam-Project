import {
  useAnswers,
  useDeleteAnswer,
  useUpdateAnswer,
} from "../../hooks/answer";
import { useContext, useState } from "react";

import { AiOutlineDelete } from "react-icons/ai";
import { Answer } from "../../types/answer";
import { FaUserCircle } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { UserContext } from "../../contexts/UserContext";
import { formatDate } from "../../utils/formatDate";
import styles from "./AnswerCard.module.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  answer: Answer;
  questionId: number;
};

const AnswerCard: React.FC<Props> = ({ answer, questionId }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { email } = user ?? {};
  const { mutateAsync: deleteAnswer } = useDeleteAnswer();
  const { refetch } = useAnswers(questionId);
  const { mutateAsync: updateAnswer } = useUpdateAnswer();
  const loggedUserAnswer = answer.email === email;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer.answer);

  const handleDelete = async (ids: [number, number]) => {
    setIsLoading(true);
    await deleteAnswer(ids);
    await refetch();
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const updatedAns = {
      ...answer,
      date: new Date().toString(),
      answer: updatedAnswer,
    };
    await updateAnswer(updatedAns);
    await refetch();
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleTitleClick = () => {
    navigate(`${questionId}`);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.container}>
          <div className={styles.container__title}>
            <FaUserCircle
              className={
                loggedUserAnswer
                  ? styles.container__logged
                  : styles.container__unlogged
              }
            />
            <p className={styles.container__name}>{answer.email}</p>
            {loggedUserAnswer && (
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
                  onClick={() => handleDelete([questionId, answer.answer_id])}
                />
              </>
            )}
          </div>
          {isEditing ? (
            <>
              <textarea
                value={updatedAnswer}
                onChange={(e) => setUpdatedAnswer(e.target.value)}
              />
            </>
          ) : (
            <>
              <p className={styles.container__content}>{answer.answer}</p>
            </>
          )}
          <p>
            {answer.modified
              ? `Last modified: ${formatDate(answer.date)}`
              : formatDate(answer.date)}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
