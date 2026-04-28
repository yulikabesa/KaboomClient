import NavigationMenu from "../components/NavigationMenu";
import classes from './Create.module.css';

const Create = () => {
  return (
    <div className={classes.background}>
      <NavigationMenu variant="create" />
    </div>
  );
};

export default Create;
