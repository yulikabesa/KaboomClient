import profilePic from "../../assets/profilePic.svg";
import classes from "./SharedWith.module.css";

type permissionType = "בעלים" | "עריכה" | "צפייה";

const SharedWith: React.FC<{
  fullName: string;
  email: string;
  permission: permissionType;
}> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["row-flex"]}>
        <img src={profilePic} />
        <div className={classes["column-flex"]}>
          <p className={classes['bigger-text']}>{props.fullName}</p>
          <p className={classes['smaller-text']}>{props.email}</p>
        </div>
      </div>
      <div>{props.permission}</div>
    </div>
  );
};

export default SharedWith;
