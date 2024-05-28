import React, { useState, useRef, useEffect } from "react";
import "./Tooltip.scss";

interface TooltipProps {
  className?: string;
  direction?: "top" | "right" | "bottom" | "left";
  effect?: "opacity" | "zoom" | "none" | undefined;
  followMouse?: boolean;
  timeout?: number;
  delay?: number;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ className = "", direction = "top", effect = "zoom", followMouse = false, timeout, delay = 0, content, children }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (visible && timeout !== undefined) {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, timeout);
    }
  }, [visible, timeout]);

  const showTooltip = (e: React.MouseEvent) => {
    if (followMouse) {
      setCoords({ x: e.clientX, y: e.clientY });
    }
    setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    setVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const tooltipStyle = followMouse ? { top: `${coords.y}px`, left: `${coords.x}px` } : {};

  return (
    <div className={`relative inline-block ${className}`} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onMouseMove={followMouse ? showTooltip : undefined}>
      {children}
      {visible && (
        <div
          id="tooltip"
          data-animation={effect}
          className={`absolute z-10 ${
            direction === "top"
              ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2"
              : direction === "right"
              ? "top-1/2 right-full transform translate-y-1/2 mr-2"
              : direction === "bottom"
              ? "top-full left-1/2 transform -translate-x-1/2 mt-2"
              : "top-1/2 left-full transform -translate-y-1/2 ml-2"
          }`}
          style={tooltipStyle}
        >
          <div className={`relative bg-black text-white rounded px-2 py-1`}>
            {content}
            <div
              className={`absolute w-2 h-2 ${
                direction === "top"
                  ? "top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  : direction === "right"
                  ? "top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2"
                  : direction === "bottom"
                  ? "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  : "bottom-1/2 right-full transform translate-y-1/2 -translate-x-1/2"
              }  bg-black -rotate-45`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
