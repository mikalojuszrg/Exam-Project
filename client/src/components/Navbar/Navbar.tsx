import { LOGIN_PATH, REGISTER_PATH } from "../../consts/paths";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Logo onClick={() => navigate(LOGIN_PATH)} />
      <div className={styles.header__buttons}>
        <Button
          variant="primary"
          onClick={() =>
            navigate(
              location.pathname === LOGIN_PATH ? REGISTER_PATH : LOGIN_PATH
            )
          }
        >
          {location.pathname === LOGIN_PATH
            ? "SIGN UP"
            : location.pathname === REGISTER_PATH
            ? "LOGIN"
            : "LOG OUT"}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
