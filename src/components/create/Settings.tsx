import React from "react";
import Overlay from "../UI/Overlay";

const Settings:React.FC<{
    closeOverlay: () => void;
}> = (props) => {
  return (
    <Overlay title="הגדרות" closeOverlay={props.closeOverlay} button={true}>
      <div>sdvns</div>
    </Overlay>
  );
};

export default Settings;
