import NavigationMenu from "../components/menu/NavigationMenu";
import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import ProductsList, { type productType } from "../components/home/ProductsList";
import axios from "axios";

const Home = () => {
  // todo get products from server
  const [createdProducts, setCreatedProducts] = useState<productType[]>([]);
  const [sharedProducts, setSharedProducts] = useState<productType[]>([]);
  const [myCourseProducts, setMyCourseProducts] = useState<productType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // to delete and get it from localStorae or context
  const userId = "69dcbda7e2af6ecb8203b547";

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!userId) return;
      setIsLoading(true);

      try {
        const [createdRes, sharedRes] = await Promise.all([
          axios.get(`http://localhost:3000/quiz/owner/${userId}`),
          axios.get(`http://localhost:3000/quiz/shared/${userId}`),
        ]);
        setCreatedProducts(createdRes.data);
        setSharedProducts(sharedRes.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching quizzes:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    fetchQuizzes();
  }, []);

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
          <ProductsList isLoading={isLoading} products={createdProducts} />
          <p className={classes["sub-title"]}>התוצרים ששותפו איתי</p>
          <ProductsList isLoading={isLoading} products={sharedProducts} />
          <p className={classes["sub-title"]}>תוצרים של הקורס שלי</p>
          <ProductsList isLoading={isLoading} products={myCourseProducts} />
          {/* todo change products to receive from server */}
        </div>
      </div>
    </>
  );
};

export default Home;
