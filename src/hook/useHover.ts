import React, { useState, useMemo } from "react";

type EventHandlers = {
  onMouseOver: () => void;
  onMouseOut: () => void;
};

const useHoverC = (): [boolean | undefined, EventHandlers] => {
  const [hovered, setHovered] = useState<boolean | undefined>(undefined);

  const eventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true);
      },
      onMouseOut() {
        setHovered(false);
      },
    }),
    []
  );

  return [hovered, eventHandlers];
};

export default useHoverC;
