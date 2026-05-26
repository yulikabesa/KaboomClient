import React, { type PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import closeIcon from "../../assets/closeIcon.svg";
import classes from "./Overlay.module.css";

interface OverlayProps extends PropsWithChildren {
  cardClassName?: string;
  className?: string;
  title: string;
  button?: boolean;
  closeOverlay: () => void;
  elementId: string;
}

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={classes["backdrop"]} onClick={props.onClick} />;
};

const OverlayCard: React.FC<OverlayProps> = (props) => {
  return (
    <div className={`${classes["card"]} ${props.cardClassName}`}>
      <header className={classes["header"]}>
        <p style={{fontWeight: '900'}}>{props.title}</p>
        {props.button && (
          // todo: fix
          <div className={classes["btn"]} onClick={props.closeOverlay}>
            <img src={closeIcon} />
          </div>
        )}
      </header>
      <div className={`${classes["content"]} ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
};


const Overlay: React.FC<OverlayProps> = (props) => {
  const portalElement: HTMLElement = document.getElementById(props.elementId)!;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.closeOverlay} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <OverlayCard {...props}>{props.children}</OverlayCard>,
        portalElement,
      )}
    </>
  );
};

export default Overlay;
