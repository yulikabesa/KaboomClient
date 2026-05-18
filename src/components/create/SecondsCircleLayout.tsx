import SecondsCircle from "./SecondsCircle";
import classes from "./SecondsCircleLayout.module.css";
import React, { useEffect, useRef, useState } from "react";

const SecondsCircleLayout: React.FC<{
  center: number;
  items: number[];
  onCenterChange: (newCenter: number) => void;
}> = ({ center, items, onCenterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const radius = isOpen ? "clamp(60px, 8vw, 90px)" : "0px";

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${classes.container} ${isOpen ? classes.open : ""}`}
    >
      {/* Surrounding */}
      {items.map((sec, index) => {
        const angle = (index / items.length) * 2 * Math.PI;

        return (
          <SecondsCircle
            key={index}
            size="small"
            seconds={sec}
            className={`${classes.item} ${
              center === sec ? classes.selected : classes.selectable
            }`}
            style={{
              transform: `translate(-50%, -50%) translate(calc(${radius} * ${Math.cos(angle)}), calc(${radius} * ${Math.sin(angle)}))`,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
            }}
            onClick={() => {
              onCenterChange(sec);
              setIsOpen(false);
            }}
          />
        );
      })}
      {/* Center */}
      <SecondsCircle
        size="big"
        seconds={`${center}\nשניות`}
        className={classes.center}
        style={{
          cursor: "pointer",
          backgroundColor: isOpen ? "#E0E0E0" : "white",
          transition: "background-color 0.2s ease",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </div>
  );
};

export default SecondsCircleLayout;
