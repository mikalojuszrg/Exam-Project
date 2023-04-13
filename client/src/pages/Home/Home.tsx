import Button from "../../components/Button/Button";
import QuestionForm from "./QuestionForm/QuestionForm";
import QuestionTimeLine from "./Timeline/QuestionTimeline";
import styles from "./Home.module.scss";
import { useState } from "react";

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Button variant="primary" onClick={toggleForm}>
        {showForm ? "Hide" : "Show"} Form
      </Button>
      {showForm && <QuestionForm />}
      <QuestionTimeLine />
    </div>
  );
};

export default Home;
