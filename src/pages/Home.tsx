import NavigationMenu from "../components/menu/NavigationMenu";
import classes from "./Home.module.css";
import layoutClasses from "../components/UI/Layout.module.css";
import { useEffect, useState } from "react";
import QuizzesList from "../components/home/QuizzesList";
import type { quizDisplayType } from "../types/quiz";
import { getOwnedQuizzes, getSharedQuizzes } from "../api/quizApi";

const Home = () => {
  const [createdProducts, setCreatedProducts] = useState<quizDisplayType[]>([]);
  const [sharedProducts, setSharedProducts] = useState<quizDisplayType[]>([]);
  // const [myCourseProducts, setMyCourseProducts] = useState<quizDisplayType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      try {
        const [createdRes, sharedRes] = await Promise.all([
          getOwnedQuizzes(),
          getSharedQuizzes(),
        ]);
        setCreatedProducts(createdRes);
        setSharedProducts(sharedRes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className={`${classes.background} ${layoutClasses.layout}`}>
      <NavigationMenu variant="home" />
      <div className={layoutClasses.main}>
        <div className={classes.page}>
          <div className={classes["top-banner"]}>
            <p className={classes["tilted-title"]}>נתקעת בלי שיעור?</p>
            <p className={classes["sub-title"]}>
              עם עשרות התבניות של קבום – כל אחד יכול להכין שיעור במהירות.
            </p>
          </div>
          <p className={classes["sub-title"]}>תוצרים שיצרתי</p>
          <QuizzesList
            isLoading={isLoading}
            quizzes={createdProducts}
            showNewQuiz
          />
          <p className={classes["sub-title"]}>התוצרים ששותפו איתי</p>
          <QuizzesList isLoading={isLoading} quizzes={sharedProducts} />
          {/* <p className={classes["sub-title"]}>תוצרים של הקורס שלי</p> */}
          {/* <QuizzesList isLoading={isLoading} quizzes={myCourseProducts} /> */}
          {/* todo decide what to do about courses quizzes */}
        </div>
      </div>
    </div>
  );
};

export default Home;
