import React from "react";
import Overlay from "../../UI/Overlay";
import classes from "./Settings.module.css";
import SharedWith from "./SharedWith";
import SearchBar from "./SearchBar";
import Tag from "./Tag";
import type { sharedWithType } from "../../home/ProductsList";

export type permissionType = "בעלים" | "עריכה" | "צפייה";

const Settings: React.FC<{
  closeOverlay: () => void;
  quizName: string;
  setQuizName: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  sharedWith: sharedWithType[];
  setSharedWith: React.Dispatch<React.SetStateAction<sharedWithType[]>>;
}> = (props) => {
  const QUIZ_NAME_MAX = 50;
  const changePermissionHandle = (
    email: string,
    newPermission: permissionType,
  ) => {
    props.setSharedWith((prev: sharedWithType[]) =>
      prev.map((user: sharedWithType) =>
        user.user.email === email
          ? { ...user, permission: newPermission }
          : user,
      ),
    );
  };

  const deleteTagHandle = (tagToDelete: string) => {
    props.setTags(props.tags.filter((tag) => tag !== tagToDelete));
  };

  const addNewSharedUserHandle = (newUser: {
    _id: string;
    name: string;
    email: string;
    permission: permissionType;
  }) => {
    console.log(newUser);
    const exists = props.sharedWith.some(
      (user) => user.user.email === newUser.email,
    );
    if (!exists) {
      const newUserToAdd = {
        permission: newUser.permission,
        user: {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name,
        },
      };
      props.setSharedWith((prev) => [...prev, newUserToAdd]);
    }
  };

  const addNewTagHandle = (newTag: { name: string; _id: string }) => {
    console.log(newTag);
    console.log(props.tags);
    const exists = props.tags.some((tag) => tag === newTag.name);
    if (!exists) {
      props.setTags((prev) => [...prev, newTag.name]);
    }
  };

  return (
    <Overlay title="הגדרות" closeOverlay={props.closeOverlay} button={true}>
      <div className={classes.container}>
        <div>
          <p className={classes.title}>כותרת</p>
          <div className={classes["input-wrapper"]}>
            <span className={classes["counter"]}>
              {props.quizName.length}/{QUIZ_NAME_MAX}
            </span>
            <input
              type="text"
              placeholder="מה שם החידון שלך?"
              maxLength={QUIZ_NAME_MAX}
              value={props.quizName}
              onChange={(e) => props.setQuizName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p className={classes.title}>תמונה</p>{" "}
          <p className={classes.brackets}>{`(אופציונלי)`}</p>
        </div>
        <div>
          <p className={classes.title}>משותפים</p>
          <div className={classes["shared-with-div"]}>
            {props.sharedWith.map((user, index) => (
              <SharedWith
                key={index}
                email={user.user.email}
                name={user.user.name}
                permission={user.permission}
                setPermission={changePermissionHandle}
              />
            ))}
          </div>
          <SearchBar
            onItemClick={addNewSharedUserHandle}
            placeHolder="הכנס מייל או שם..."
            searchFor="user"
          />
        </div>
        <div>
          <p className={classes.title}>תגיות</p>
          <SearchBar
            onItemClick={addNewTagHandle}
            placeHolder="איזה קורסים יכולים להשתמש בקהות שלך?"
            searchFor="tag"
          />
          <div className={classes["shared-with-div"]}>
            {props.tags.map((tag, index) => (
              <Tag key={index} tag={tag} deleteTag={deleteTagHandle} />
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Settings;
