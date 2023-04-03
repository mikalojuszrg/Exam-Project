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

type Props = {
  answer: Answer;
  questionId: number;
};

const AnswerCard: React.FC<Props> = ({ answer, questionId }) => {
  const { user } = useContext(UserContext);
  const { email } = user ?? {};
  console.log(email);
  const { mutateAsync: deleteAnswer } = useDeleteAnswer();
  const { refetch } = useAnswers(questionId);
  const { mutateAsync: updateAnswer } = useUpdateAnswer();
  const loggedUserAnswer = answer.email === email;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer.answer);
  const upvotedBy = answer.upvotedBy ?? [];

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

  const handleVote = async (vote: "upvote" | "downvote") => {
    if (!email) {
      return; // If user is not logged in, do nothing.
    }
    console.log(email);
    setIsLoading(true);
    const updatedAns = { ...answer };
    updatedAns.upvote = answer.upvote ?? 0;
    updatedAns.downvote = answer.downvote ?? 0;
    updatedAns.upvotedBy = upvotedBy;
    if (vote === "upvote") {
      updatedAns.upvote += 1;
      updatedAns.upvotedBy.push(email);
      updatedAns.upvotedBy = [...new Set([...upvotedBy, email])];
      console.log(updatedAns);
    } else {
      updatedAns.downvote += 1;
      updatedAns.upvotedBy = upvotedBy.filter((e) => e !== email);
    }

    await updateAnswer(updatedAns);

    await refetch();
    setIsLoading(false);
  };

  const handleUnvote = async () => {
    if (!email) {
      return; // If user is not logged in, do nothing.
    }
    setIsLoading(true);
    const updatedAns = { ...answer };
    updatedAns.upvote = answer.upvote ?? 0;
    updatedAns.downvote = answer.downvote ?? 0;
    updatedAns.upvotedBy = upvotedBy.filter((e) => e !== email);

    await updateAnswer(updatedAns);

    await refetch();
    setIsLoading(false);
  };

  return (
    <div className={styles.answerCard}>
      <div className={styles.answerContent}>
        <div className={styles.left}>
          <FaUserCircle className={styles.userIcon} />
        </div>
        <div className={styles.right}>
          {loggedUserAnswer && (
            <div className={styles.editDelete}>
              {isEditing ? (
                <>
                  <button
                    className={styles.saveBtn}
                    onClick={handleUpdate}
                    disabled={isLoading}
                  >
                    Save
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.editBtn}
                    onClick={() => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete([questionId, answer.answer_id])}
                    disabled={isLoading}
                  >
                    <AiOutlineDelete />
                  </button>
                </>
              )}
            </div>
          )}
          {isEditing ? (
            <textarea
              className={styles.editAnswer}
              value={updatedAnswer}
              onChange={(e) => setUpdatedAnswer(e.target.value)}
            />
          ) : (
            <p className={styles.answer}>{answer.answer}</p>
          )}
          <div className={styles.votes}>
            <button
              className={styles.upvote}
              onClick={() => handleVote("upvote")}
              disabled={isLoading}
            >
              ▲
            </button>
            <span className={styles.voteCount}>
              {answer.upvote - answer.downvote}
            </span>
            <button
              className={styles.downvote}
              onClick={() => handleVote("downvote")}
              disabled={isLoading}
            >
              ▼
            </button>
            {upvotedBy.includes(email!) && (
              <button
                className={styles.unvote}
                onClick={handleUnvote}
                disabled={isLoading}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.questionLink}>
        <span>Answer to: </span>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default AnswerCard;
