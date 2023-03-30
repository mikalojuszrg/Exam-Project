import * as Yup from "yup";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { NewQuestion, Question } from "../../../types/question";
import { useContext, useState } from "react";
import { useCreateQuestion, useQuestions } from "../../../hooks/question";

import Button from "../../../components/Button/Button";
import { UserContext } from "../../../contexts/UserContext";
import styles from "./QuestionForm.module.scss";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(
    "Your question title can't be empty. Write something!"
  ),
  content: Yup.string().required(
    "Your question content can't be empty. Write something!"
  ),
});

const QuestionForm = () => {
  const { user } = useContext(UserContext);
  const { first_name = "", last_name = "", email = "" } = user ?? {};
  const { mutateAsync: createPost } = useCreateQuestion();
  const { refetch, isLoading } = useQuestions();
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (
    values: NewQuestion,
    { resetForm }: FormikHelpers<NewQuestion>
  ) => {
    setIsFetching(true);
    const newQuestion: NewQuestion = {
      ...values,
      date: new Date().toString(),
      id: new Date().getTime(),
      first_name: first_name,
      last_name: last_name,
      email: email,
    };
    await createPost(newQuestion);
    resetForm();
    await refetch();
    setIsFetching(false);
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={
          {
            title: "",
            content: "",
            email: email,
            id: new Date().getTime(),
            first_name: first_name,
            last_name: last_name,
            date: "",
          } as NewQuestion
        }
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <Form className={styles.form}>
            <Field
              className={styles.form__input}
              name="title"
              placeholder="Enter your question title"
            />
            <Field
              className={styles.form__textarea}
              name="content"
              placeholder="Share what's new in your life!"
              component="textarea"
            />
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || isFetching}
            >
              {isFetching ? "Sharing..." : "SHARE"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuestionForm;
