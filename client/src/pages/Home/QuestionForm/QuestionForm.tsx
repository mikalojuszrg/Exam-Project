import * as Yup from "yup";

import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useState } from "react";
import { useCreateQuestion, useQuestions } from "../../../hooks/question";

import Button from "../../../components/Button/Button";
import FormikInput from "../../../components/FormikInput/FormikInput";
import FormikTextArea from "../../../components/FormikTextarea/FormikTextarea";
import { NewQuestion } from "../../../types/question";
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
        {() => (
          <Form className={styles.form}>
            <FormikInput
              type="text"
              name="title"
              placeholder="Enter your question title"
            />
            <FormikTextArea
              name="content"
              placeholder="Enter your question content"
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
