import { ErrorMessage, Field } from "formik";
import TextArea, { Props } from "../Textarea/Textarea";

const FormikTextArea = (props: Props) => {
  return (
    <div>
      <Field {...props} as={TextArea} />
      <ErrorMessage component="div" {...props} />
    </div>
  );
};

export default FormikTextArea;
