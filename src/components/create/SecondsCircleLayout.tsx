import SecondsCircle from "./SecondsCircle";
import classes from "./SecondsCircleLayout.module.css";
import React, { useState, type Dispatch, type SetStateAction } from 'react';

const SecondsCircleLayout: React.FC<{
  center: string;
  setCenter: Dispatch<SetStateAction<string>>;
  items: string[];
}> = ({ center, setCenter, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const radius = isOpen ? 5.5 : 0;

  return (
    <div className={`${classes.container} ${isOpen ? classes.open : ""}`}>
      {/* Center */}
      <SecondsCircle
        size="big"
        seconds={`${center}\nשניות`}
        className={classes.center}
        style={{ cursor: "pointer",
            backgroundColor: isOpen ? "#E0E0E0" : "white",
            transition: "background-color 0.2s ease",
         }}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* Surrounding */}
      {items.map((sec, index) => {
        const angle = (index / items.length) * 2 * Math.PI;

        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <SecondsCircle
            key={index}
            size="small"
            seconds={sec}
            className={`${classes.item} ${
              center === sec ? classes.selected : classes.selectable
            }`}
            style={{
              transform: `translate(-50%, -50%) translate(${x}vw, ${y}vw)`,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
            }}
            onClick={() => {
              setCenter(sec);
              setIsOpen(false);
            }}
          />
        );
      })}
    </div>
  );
};

export default SecondsCircleLayout;
