import NavigationMenu from "../components/menu/NavigationMenu";
import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import QuizzesList from "../components/home/QuizzesList";
import type { quizType } from "../types/quiz";
import { getOwnerQuizzes, getSharedQuizzes } from "../api/quizApi";
import { useAuth } from "../store/AuthContext";

const Home = () => {
  // todo get products from server
  const [createdProducts, setCreatedProducts] = useState<quizType[]>([]);
  const [sharedProducts, setSharedProducts] = useState<quizType[]>([]);
  const [myCourseProducts, setMyCourseProducts] = useState<quizType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const userId = user?._id;

  // const userId = "69dcbda7e2af6ecb8203b547";

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const [createdRes, sharedRes] = await Promise.all([
          getOwnerQuizzes(userId),
          getSharedQuizzes(userId),
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
  }, [userId]);

  return (
    <>
      <NavigationMenu variant="home" />
      <div className={classes.background}>
        <div className={classes.container}>
          <div className={classes["question-marks-div"]}>
            <p className={classes["tilted-title"]}>נתקעת בלי שיעור?</p>
            <p className={classes["sub-title"]}>
              עם עשרות התבניות של קבום – כל אחד יכול להכין שיעור במהירות.
            </p>
          </div>
          <p className={classes["sub-title"]}>תוצרים שיצרתי</p>
          <QuizzesList isLoading={isLoading} quizzes={createdProducts} />
          <p className={classes["sub-title"]}>התוצרים ששותפו איתי</p>
          <QuizzesList isLoading={isLoading} quizzes={sharedProducts} />
          <p className={classes["sub-title"]}>תוצרים של הקורס שלי</p>
          <QuizzesList isLoading={isLoading} quizzes={myCourseProducts} />
          {/* todo change products to receive from server */}
        </div>
      </div>
    </>
  );
};

export default Home;
