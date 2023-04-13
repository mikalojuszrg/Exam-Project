import styles from "./Input.module.scss";

export type Props = {
  type: string;
  name: string;
  placeholder: string;
};

const Input = (props: Props) => {
  return <input className={styles.input} maxLength={50} {...props} />;
};

export default Input;
