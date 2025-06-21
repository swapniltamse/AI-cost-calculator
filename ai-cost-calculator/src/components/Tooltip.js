// ai-cost-calculator/src/components/Tooltip.js
import React, { useState } from "react";
import "./Tooltip.css"; // Ensure this CSS file exists

const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <div className="tooltip-box">{text}</div>}
    </div>
  );
};

export default Tooltip;
