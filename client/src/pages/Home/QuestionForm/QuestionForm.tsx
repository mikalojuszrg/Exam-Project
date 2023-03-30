import * as Yup from "yup";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useContext, useState } from "react";
import { useCreateQuestion, useQuestions } from "../../../hooks/question";

import Button from "../../../components/Button/Button";
import { NewQuestion } from "../../../types/question";
import { UserContext } from "../../../contexts/UserContext";
import styles from "./QuestionForm.module.scss";

const validationSchema = Yup.object().shape({
  content: Yup.string().required(
    "Your question can't be empty. Write something!"
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
    await createPost({
      ...values,
      date: new Date().toString(),
    });
    resetForm();
    await refetch();
    setIsFetching(false);
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={
          {
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
