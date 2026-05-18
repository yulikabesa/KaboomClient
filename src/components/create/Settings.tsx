import React, { useState } from "react";
import Overlay from "../UI/Overlay";
import classes from "./Settings.module.css";
import SharedWith from "./SharedWith";
import SearchBar from "./SearchBar";

export type permissionType = "בעלים" | "עריכה" | "צפייה";
export type sharedWithType = {
  name: string;
  email: string;
  permission: permissionType;
};
const Settings: React.FC<{
  closeOverlay: () => void;
}> = (props) => {
  const TITLE_MAX = 50;
  const [title, setTitle] = useState("");
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
  const [sharedWith, setSharedWith] =
    useState<sharedWithType[]>(sharedWithExample);

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
              {title.length}/{TITLE_MAX}
            </span>
            <input
              type="text"
              placeholder="מה שם החידון שלך?"
              maxLength={TITLE_MAX}
              onChange={(e) => setTitle(e.target.value)}
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
          <SearchBar onItemClick={addNewSharedUserHandle} />
        </div>
        <p className={classes.title}>תגיות</p>
      </div>
    </Overlay>
  );
};

export default Settings;
