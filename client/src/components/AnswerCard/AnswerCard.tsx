import {
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineSave,
  AiOutlineUndo,
} from "react-icons/ai";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import {
  useAnswers,
  useDeleteAnswer,
  useUpdateAnswer,
} from "../../hooks/answer";
import { useContext, useState } from "react";

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
      return;
    }
    setIsLoading(true);
    const updatedAns = { ...answer };
    updatedAns.upvote = answer.upvote ?? 0;
    updatedAns.downvote = answer.downvote ?? 0;
    updatedAns.upvotedBy = upvotedBy;
    if (vote === "upvote") {
      updatedAns.upvote += 1;
      updatedAns.upvotedBy.push(email);
      updatedAns.upvotedBy = [...new Set([...upvotedBy, email])];
    } else {
      updatedAns.downvote += 1;
      updatedAns.upvotedBy = upvotedBy.filter((e) => e !== email);
    }
    await updateAnswer(updatedAns);

    await refetch();
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div>
          {loggedUserAnswer && (
            <div className={styles.container__title}>
              {isEditing ? (
                <>
                  <AiOutlineSave
                    className={styles.container__icon}
                    onClick={handleUpdate}
                  />
                  <AiOutlineUndo
                    className={styles.container__icon}
                    onClick={() => setIsEditing(false)}
                  />
                </>
              ) : (
                <>
                  <AiFillEdit
                    className={styles.container__icon}
                    onClick={() => setIsEditing(true)}
                  ></AiFillEdit>
                  <AiOutlineDelete
                    className={styles.container__icon}
                    onClick={() => handleDelete([questionId, answer.answer_id])}
                  ></AiOutlineDelete>
                </>
              )}
            </div>
          )}
          {isEditing ? (
            <textarea
              className={styles.container__input}
              value={updatedAnswer}
              onChange={(e) => setUpdatedAnswer(e.target.value)}
            />
          ) : (
            <p className={styles.answer}>{answer.answer}</p>
          )}
          <div className={styles.container__votes}>
            <BiUpvote
              className={styles.upvote}
              onClick={() => handleVote("upvote")}
            />
            <span className={styles.voteCount}>
              {answer.upvote - answer.downvote}
            </span>
            <BiDownvote onClick={() => handleVote("downvote")} />
          </div>
        </div>
        <div className={styles.container__user}>
          <FaUserCircle
            className={
              loggedUserAnswer
                ? styles.container__logged
                : styles.container__unlogged
            }
          />
          <p className={styles.container__name}>{answer.email}</p>
        </div>
        <p>
          {answer.modified
            ? `Last modified: ${formatDate(answer.modified)}`
            : formatDate(answer.date)}
        </p>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default AnswerCard;
