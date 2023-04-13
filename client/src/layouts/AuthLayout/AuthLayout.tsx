import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { PropsWithChildren } from "react";
import styles from "./AuthLayout.module.scss";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
