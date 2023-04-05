import styles from "../components/Button/Button.module.scss";

type ButtonClassNames = {
  [key: string]: string[];
};

export const buttonClassNames: ButtonClassNames = {
  primary: [styles["button--primary"], styles["button"]],
  secondary: [styles["button--secondary"], styles["button"]],
  tertiary: [styles["button--tertiary"], styles["button"]],
};
