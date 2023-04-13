import { ErrorMessage, Field } from "formik";
import Input, { Props } from "../Input/Input";

import styles from "./FormikInput.module.scss";

const FormikInput = (props: Props) => {
  return (
    <div className={styles.container}>
      <Field {...props} as={Input} />
      <ErrorMessage
        className={styles.container__error}
        component="div"
        {...props}
      />
    </div>
  );
};

export default FormikInput;
