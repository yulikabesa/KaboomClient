import React from "react";
import classes from "./Tooltip.module.css";
import { createPortal } from "react-dom";

type Placement = "top" | "bottom" | "left" | "right";
const GAP = 8;

const ToolTip: React.FC<{
  content: string;
  target: HTMLElement;
  backgroundColor: string;
  placement?: Placement;
}> = ({ content, target, backgroundColor, placement = "left" }) => {
  const rect = target.getBoundingClientRect();

  const style: React.CSSProperties = {
    position: "fixed",
    backgroundColor,
    ["--tooltip-arrow" as any]: backgroundColor,
  };

  switch (placement) {
    case "left":
      style.top = rect.top + rect.height / 2;
      style.left = rect.left - GAP;
      break;

    case "right":
      style.top = rect.top + rect.height / 2;
      style.left = rect.right + GAP;
      break;

    case "top":
      style.top = rect.top - GAP;
      style.left = rect.left + rect.width / 2;
      break;

    case "bottom":
      style.top = rect.bottom + GAP;
      style.left = rect.left + rect.width / 2;
      break;
  }

  return createPortal(
    <div
      className={`${classes.tooltip} ${classes[placement]}`}
      style={style}
    >
      {content}
    </div>,
    document.body,
  );
};

export default ToolTip;
