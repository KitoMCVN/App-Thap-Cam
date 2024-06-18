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
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  className = "",
  direction = "top",
  effect = "zoom",
  followMouse = false,
  timeout,
  delay = 0,
  content,
  children,
}) => {
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

  const tooltipStyle = followMouse
    ? { top: `${coords.y}px`, left: `${coords.x}px` }
    : {};

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onMouseMove={followMouse ? showTooltip : undefined}
    >
      {children}
      {visible && (
        <div
          id="tooltip"
          data-animation={effect}
          className={`absolute z-10 ${
            direction === "top"
              ? "bottom-full left-1/2 mb-2 -translate-x-1/2 transform"
              : direction === "right"
                ? "right-full top-1/2 mr-2 translate-y-1/2 transform"
                : direction === "bottom"
                  ? "left-1/2 top-full mt-2 -translate-x-1/2 transform"
                  : "left-full top-1/2 ml-2 -translate-y-1/2 transform"
          }`}
          style={tooltipStyle}
        >
          <div className={`relative rounded bg-black px-2 py-1 text-white`}>
            {content}
            <div
              className={`absolute h-2 w-2 ${
                direction === "top"
                  ? "left-1/2 top-full -translate-x-1/2 -translate-y-1/2 transform"
                  : direction === "right"
                    ? "left-full top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                    : direction === "bottom"
                      ? "bottom-full left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                      : "bottom-1/2 right-full -translate-x-1/2 translate-y-1/2 transform"
              } -rotate-45 bg-black`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
