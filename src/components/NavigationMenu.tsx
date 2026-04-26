import classes from "./NavigationMenu.module.css";
import { Link } from "react-router-dom";
import kaboomLogo from "../assets/kaboomLogo.png";

const NavigationMenu = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <img src={kaboomLogo} className={classes.logo} />
      </Link>
      <nav>
        <ul>
          <li>
            <Link className={classes["white-btn"]} to="/join">
              לשחק
            </Link>
          </li>
          <li>
            <Link className={classes["blue-btn"]} to="/create">
              ליצור
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationMenu;
