import {
  HOME_PATH,
  LOGIN_PATH,
  QUESTION_PATH,
  REGISTER_PATH,
} from "../../consts/paths";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Navbar.module.scss";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogOut } = useContext(UserContext);

  const handleLogoutClick = () => {
    handleLogOut();
    if (
      location.pathname === HOME_PATH ||
      location.pathname === QUESTION_PATH
    ) {
      navigate(LOGIN_PATH);
    }
  };

  return (
    <header className={styles.header}>
      <Logo onClick={() => navigate(LOGIN_PATH)} />
      <div className={styles.header__buttons}>
        {location.pathname === LOGIN_PATH ||
        location.pathname === REGISTER_PATH ? (
          <Button
            variant="primary"
            onClick={() =>
              navigate(
                location.pathname === LOGIN_PATH ? REGISTER_PATH : LOGIN_PATH
              )
            }
          >
            {location.pathname === LOGIN_PATH ? "SIGN UP" : "LOGIN"}
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleLogoutClick}>
            LOG OUT
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
