import React from "react";
import "./popup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

const PopupComponent = ({ open, handleClose, title, children }) => {
  return (
    <div>

      {open && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>{title}</h2>
              <FontAwesomeIcon
                icon={faXmark}
                color="gray"
                onClick={handleClose}
                fontSize={25}
                style={{ cursor: "pointer" }}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
