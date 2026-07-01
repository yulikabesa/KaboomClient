import React, { useState } from "react";
import Overlay from "../../UI/Overlay";
import classes from "./Settings.module.css";
import SharedWith from "./SharedWith";
import SearchBar from "./SearchBar";
import Tag from "./Tag";
import ImageInput from "../Image/ImageInput";
import type { questionImageType, sharedWithType, User } from "../../../types/quiz";
import Button from "../../UI/Button";
import DeleteQuizOverlay from "./DeleteQuizOverlay";
import type { permissionType } from "../../../types/quiz";
import { useAuth } from "../../../store/AuthContext";

const Settings: React.FC<{
  closeOverlay: () => void;
  quizName: string;
  setQuizName: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  sharedWith: sharedWithType[];
  setSharedWith: React.Dispatch<React.SetStateAction<sharedWithType[]>>;
  owner: User | null;
  coverImage: questionImageType;
  setCoverImage: (updates: Partial<questionImageType>) => void;
  // areAllFieldsFull: () => boolean;
  onQuizDelete: () => void;
  onQuizSave: () => void;
}> = (props) => {
  const QUIZ_NAME_MAX = 50;
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  const { user } = useAuth();

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

  const deleteSharedUserHandle = (indexToRemove: number) => {
    props.setSharedWith((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
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

  const changeShowDeleteOverlay = () => {
    setShowDeleteOverlay((prev) => !prev);
  };

  const owner = {
    user: props.owner ?? user,
    permission: "בעלים",
  } as sharedWithType;

  // to disable delete button to non owners
  let deleteBtnDisabled = true;
  if (user)
    deleteBtnDisabled = props.sharedWith.some(
      (shared) => shared.user._id === user._id,
    );

  return (
    <>
      <Overlay
        elementId="overlay"
        title="הגדרות"
        closeOverlay={props.closeOverlay}
        button={true}
      >
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
            <div className={classes["image-wrapper"]}>
              <ImageInput
                imageSrc={props.coverImage.src}
                imagePreview={props.coverImage.image}
                crop={props.coverImage.crop}
                zoom={props.coverImage.zoom}
                croppedAreaPixels={props.coverImage.croppedAreaPixels}
                setImageDetails={props.setCoverImage}
                variant="settings"
              />
            </div>
          </div>
          <div>
            <p className={classes.title}>משותפים</p>
            <div className={classes["shared-with-div"]}>
              {owner.user && (
                <SharedWith
                  key={"owner"}
                  email={owner.user.email}
                  name={owner.user.name}
                  permission={owner.permission}
                  setPermission={changePermissionHandle}
                  deleteSharedUser={deleteSharedUserHandle}
                  index={-1}
                />
              )}
              {props.sharedWith.map((user, index) => (
                <SharedWith
                  key={"shared-" + index}
                  email={user.user.email}
                  name={user.user.name}
                  permission={user.permission}
                  setPermission={changePermissionHandle}
                  deleteSharedUser={deleteSharedUserHandle}
                  index={index}
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
        <div className={classes["buttons-flex"]}>
          <Button
            variant="blue"
            onClick={() => {
              // todo use the are all fields full with isGameable property
              // console.log(props.areAllFieldsFull());
              props.onQuizSave();
            }}
          >
            שמור וצא
          </Button>
          <Button
            variant="red"
            onClick={changeShowDeleteOverlay}
            disabled={deleteBtnDisabled}
          >
            מחק שאלון
          </Button>
        </div>
      </Overlay>
      {showDeleteOverlay && (
        <DeleteQuizOverlay
          onClose={changeShowDeleteOverlay}
          onDelete={props.onQuizDelete}
        />
      )}
    </>
  );
};

export default Settings;
