import React, { useState } from "react";
import Overlay from "../UI/Overlay";
import classes from "./Settings.module.css";
import SharedWith from "./SharedWith";
import SearchBar from "./SearchBar";
import Tag from "./Tag";

export type permissionType = "בעלים" | "עריכה" | "צפייה";
export type sharedWithType = {
  name: string;
  email: string;
  permission: permissionType;
};

const Settings: React.FC<{
  closeOverlay: () => void;
  quizName: string;
  setQuizName: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const QUIZ_NAME_MAX = 50;
  const sharedWithExample: sharedWithType[] = [
    {
      name: "נגה זאבי",
      email: "User@test.com",
      permission: "בעלים",
    },
    {
      name: "יעל קבסא",
      email: "User2@test.com",
      permission: "צפייה",
    },
  ];
  const tagsExample = ["קורס 10", "קורס 15"];

  const [sharedWith, setSharedWith] =
    useState<sharedWithType[]>(sharedWithExample);

  const [tags, setTags] = useState<string[]>(tagsExample);

  const changePermissionHandle = (
    email: string,
    newPermission: permissionType,
  ) => {
    setSharedWith((prev: sharedWithType[]) =>
      prev.map((user: sharedWithType) =>
        user.email === email ? { ...user, permission: newPermission } : user,
      ),
    );
  };

  const deleteTagHandle = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const addNewSharedUserHandle = (newUser: sharedWithType) => {
    const exists = sharedWith.some((user) => user.email === newUser.email);
    if (!exists) {
      setSharedWith((prev) => [...prev, newUser]);
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
            {sharedWith.map((user, index) => (
              <SharedWith
                key={index}
                email={user.email}
                name={user.name}
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
            onItemClick={addNewSharedUserHandle}
            placeHolder="איזה קורסים יכולים להשתמש בקהות שלך?"
            searchFor="tag"
          />
          <div className={classes["shared-with-div"]}>
            {tags.map((tag, index) => (
              <Tag key={index} tag={tag} deleteTag={deleteTagHandle} />
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Settings;
