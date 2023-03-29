import LoginForm from "./LoginForm/LoginForm";
import image from "../Login/assets/people.jpg";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <main className={styles.container}>
      <section className={styles.container__info}>
        <h2 className={styles.container__subheading}>NEW PLATFORM</h2>
        <h1 className={styles.container__heading}>Your Next Social Life.</h1>
        <p className={styles.container__description}>
          Discover a new social media experience. Your interests matter, and so
          does your time. Join now and get more of what you care about.
        </p>
        <LoginForm />
      </section>
      <section className={styles.container__visual}>
        <img src={image} alt="people talking" />
      </section>
    </main>
  );
};

export default Login;
