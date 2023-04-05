import { ReactNode } from "react";
import { buttonClassNames } from "../../consts/buttonClassNames";
import classNames from "classnames";
import styles from "./Button.module.scss";

const cn = classNames.bind(styles);

type props = {
  children: ReactNode;
  onClick?: () => void;
  type?: string;
  variant: string;
  disabled?: boolean;
};

const Button: React.FC<props> = ({ children, variant, onClick }) => {
  const classes = buttonClassNames[variant];
  return (
    <button className={cn(...classes)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
