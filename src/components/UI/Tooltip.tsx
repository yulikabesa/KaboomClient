import React from "react";
import classes from "./Tooltip.module.css";
import { createPortal } from "react-dom";

const ToolTip: React.FC<{
  content: string;
  target: HTMLElement;
}> = ({ content, target }) => {
  const rect = target.getBoundingClientRect();
  return createPortal(
    <div
      className={classes.tooltip}
      style={{
        position: "fixed",
        top: rect.top + rect.height / 2,
        left: rect.left - 8,
      }}
    >
      {content}
    </div>,
    document.body,
  );
};

export default ToolTip;
