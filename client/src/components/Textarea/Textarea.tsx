import styles from "./Textarea.module.scss";

export type Props = {
  name: string;
  placeholder: string;
};

const TextArea = (props: Props) => {
  return <textarea className={styles.textarea} maxLength={50} {...props} />;
};

export default TextArea;
