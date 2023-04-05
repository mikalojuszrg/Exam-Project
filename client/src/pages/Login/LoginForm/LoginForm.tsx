import * as Yup from "yup";

import { Form, Formik } from "formik";

import Button from "../../../components/Button/Button";
import FormikInput from "../../../components/FormikInput/FormikInput";
import { HOME_PATH } from "../../../consts/paths";
import { UserContext } from "../../../contexts/UserContext";
import styles from "./LoginForm.module.scss";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { useLoginUser } from "../../../hooks/user";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

interface Login {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { mutateAsync: loginUser } = useLoginUser();
  const handleSubmit = (values: Login) => {
    loginUser(values)
      .then((response) => {
        setUser(response);
        navigate(HOME_PATH);
        toast.success("Login successful");
      })
      .catch(() => toast.error("You've entered wrong details"));
  };

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.form__inputs}>
            <FormikInput type="email" name="email" placeholder="Email" />
            <FormikInput
              type="password"
              name="password"
              placeholder="Password"
            />
            <Button variant="primary" type="submit">
              GET STARTED
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
