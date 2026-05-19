import profilePic from "../../assets/profilePic.svg";
import classes from "./SharedWith.module.css";
import type { permissionType } from "./Settings";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SharedWith: React.FC<{
  name: string;
  email: string;
  permission: permissionType;
  setPermission: (email: string, newPermission: permissionType) => void;
}> = (props) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!open || !buttonRef.current) return;
    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current?.contains(e.target as Node)) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <div className={classes.container}>
      <div className={classes["row-flex"]}>
        <img src={profilePic} />
        <div className={classes["column-flex"]}>
          <p className={classes["bigger-text"]}>{props.name}</p>
          <p className={classes["smaller-text"]}>{props.email}</p>
        </div>
      </div>
      <div className={classes.dropdown}>
        <button
          ref={buttonRef}
          className={
            props.permission !== "בעלים"
              ? classes["changable-permission"]
              : classes["permission"]
          }
          style={{ backgroundColor: open ? "#dfdfdf" : "" }}
          onClick={() => {
            if (props.permission !== "בעלים") setOpen((prev) => !prev);
          }}
        >
          {props.permission}
          {props.permission !== "בעלים" && !open && "⏷"}
          {props.permission !== "בעלים" && open && "⏶"}
        </button>
        {props.permission !== "בעלים" &&
          open &&
          createPortal(
            <div
              className={classes["dropdown-menu"]}
              style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                width: position.width,
                zIndex: 9999,
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <div
                className={classes["dropdown-item"]}
                onClick={(e) => {
                  e.stopPropagation();
                  props.setPermission(props.email, "צפייה");
                  setOpen(false);
                }}
              >
                <span className={classes["correct-sign"]}>
                  {props.permission === "צפייה" && "✓"}
                </span>
                <span>צפייה</span>
              </div>

              <div
                className={classes["dropdown-item"]}
                onClick={(e) => {
                  e.stopPropagation();
                  props.setPermission(props.email, "עריכה");
                  setOpen(false);
                }}
              >
                <span className={classes["correct-sign"]}>
                  {props.permission === "עריכה" && "✓"}
                </span>
                <span>עריכה</span>
              </div>
            </div>,
            document.getElementById("overlay")!,
          )}
      </div>
    </div>
  );
};

export default SharedWith;
