import * as Yup from "yup";

import { Form, Formik } from "formik";

import Button from "../../../components/Button/Button";
import FormikInput from "../../../components/FormikInput/FormikInput";
import { LOGIN_PATH } from "../../../consts/paths";
import { UserRegister } from "../../../types/user";
import styles from "./RegisterForm.module.scss";
import { toast } from "react-hot-toast";
import { useCreateUser } from "../../../hooks/user";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: createUser } = useCreateUser();

  const handleSubmit = (values: UserRegister) => {
    createUser(values)
      .then(() => {
        navigate(LOGIN_PATH);
        toast.success("Registration successful");
      })
      .catch(() => toast.error("Email alredy exists"));
  };

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <FormikInput
              type="text"
              name="first_name"
              placeholder="First Name"
            />
            <FormikInput type="text" name="last_name" placeholder="Last Name" />
            <FormikInput type="email" name="email" placeholder="Email" />
            <FormikInput
              type="password"
              name="password"
              placeholder="Password"
            />
            <FormikInput
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
            <Button variant="primary" type="submit">
              REGISTER
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
