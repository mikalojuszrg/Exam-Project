import styles from "./Input.module.scss";

export interface Props {
  type: string;
  name: string;
  placeholder: string;
}

const Input = (props: Props) => {
  return <input className={styles.input} maxLength={24} {...props} />;
};

export default Input;
