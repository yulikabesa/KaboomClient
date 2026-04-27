import NavigationMenu from "../components/NavigationMenu";
import classes from "./Home.module.css";
import { useState } from "react";
import ProductsList from "../components/ProductsList";
const Home = () => {
  // todo get products from server
  const [products, setProducts] = useState([3, 4, 3, 1, 3, 4, 3, 2]);
  return (
    <>
      <NavigationMenu />
      <div className={classes.background}>
        <div className={classes.container}>
          <div className={classes["question-marks-div"]}>
            <p className={classes["tilted-title"]}>נתקעת בלי שיעור?</p>
            <p className={classes["sub-title"]}>
              עם עשרות התבניות של קבום – כל אחד יכול להכין שיעור במהירות.
            </p>
          </div>
          <p className={classes["sub-title"]}>תוצרים שיצרתי</p>
          <ProductsList products={[1, 2, 3, 4, 5]} />
          <p className={classes["sub-title"]}>התוצרים ששותפו איתי</p>
          <ProductsList products={products} />
          <p className={classes["sub-title"]}>תוצרים של הקורס שלי</p>
          <ProductsList products={[1, 2, 5, 5]} />
          {/* todo change products to receive from server */}
        </div>
      </div>
    </>
  );
};

export default Home;
