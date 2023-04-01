import * as Yup from "yup";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useCallback, useContext, useState } from "react";

import { NewAnswer } from "../../../types/answer";
import { UserContext } from "../../../contexts/UserContext";
import styles from "./AnswerForm.module.scss";
import { useCreateAnswer } from "../../../hooks/answer";

interface Props {
  questionId: number;
  refetchAnswers?: () => Promise<void>;
}

const validationSchema = Yup.object().shape({
  answer: Yup.string()
    .min(5, "Your answer should be at least 5 characters long")
    .required("Your answer can't be empty. Write something!"),
});

const AnswerForm = ({ questionId, refetchAnswers }: Props) => {
  const { user } = useContext(UserContext);
  const { email = "" } = user ?? {};
  const { mutateAsync: createAnswer } = useCreateAnswer();
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
      await refetchAnswers?.();
      setIsFetching(false);
    },
    [createAnswer, email, questionId, refetchAnswers]
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
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className={styles.form}>
            <Field
              className={styles.form__textarea}
              name="answer"
              placeholder="Write your answer here..."
              component="textarea"
            />
            <button
              className={styles.form__button}
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? "Posting..." : "POST"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AnswerForm;
