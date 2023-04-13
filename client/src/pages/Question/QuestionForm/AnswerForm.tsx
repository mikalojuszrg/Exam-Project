import * as Yup from "yup";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAnswers, useCreateAnswer } from "../../../hooks/answer";
import { useCallback, useContext, useState } from "react";

import Button from "../../../components/Button/Button";
import FormikTextArea from "../../../components/FormikTextarea/FormikTextarea";
import { NewAnswer } from "../../../types/answer";
import { UserContext } from "../../../contexts/UserContext";
import styles from "./AnswerForm.module.scss";

interface Props {
  questionId: number;
}

const validationSchema = Yup.object().shape({
  answer: Yup.string()
    .min(5, "Your answer should be at least 5 characters long")
    .required("Your answer can't be empty. Write something!"),
});

const AnswerForm = ({ questionId }: Props) => {
  const { user } = useContext(UserContext);
  const { email = "" } = user ?? {};
  const { mutateAsync: createAnswer } = useCreateAnswer();
  const { refetch } = useAnswers(questionId);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = useCallback(
    async (
      values: NewAnswer,
      { resetForm }: FormikHelpers<NewAnswer>
    ): Promise<void> => {
      setIsFetching(true);
      const newAnswer: NewAnswer = {
        ...values,
        answer_id: new Date().getTime(),
        question_id: questionId,
        email: email,
      };
      await createAnswer({ questionId: questionId, answer: newAnswer });
      resetForm();
      refetch();
      setIsFetching(false);
    },
    [createAnswer, email, questionId, refetch]
  );

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          answer: "",
          answer_id: 0,
          question_id: 0,
          email: "",
          date: "",
          upvote: 0,
          downvote: 0,
          upvotedBy: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className={styles.form}>
            <FormikTextArea
              name="answer"
              placeholder="Write your answer here..."
            />
            <Button variant="primary" type="submit" disabled={isFetching}>
              {isFetching ? "Answering..." : "ANSWER"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AnswerForm;
