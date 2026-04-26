import NavigationMenu from "../components/NavigationMenu";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.background}>
      <NavigationMenu />
    </div>
  );
};

export default Home;
