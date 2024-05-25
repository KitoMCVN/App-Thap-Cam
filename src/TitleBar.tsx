import React, { useState } from "react";

const TitleBar = () => {
  const [isMaximized, setMaximized] = useState(false);

  const handleToggle = () => {
    if (isMaximized) {
      setMaximized(false);
    } else {
      setMaximized(true);
    }
    window.Main.Maximize();
  };

  return (
    <div className="w-full draggable">
      <div className="">
        <div className="flex justify-between">
          <div className="">Coá con cặk</div>
          <div className="flex rounded-tr-lg overflow-hidden">
            <div onClick={window.Main.Minimize} className="undraggable px-1 hover:bg-gray-300">
              <div className="size-10 text-lg flex items-center justify-center">–</div>
            </div>
            <div onClick={handleToggle} className="undraggable px-1 hover:bg-gray-300">
              <div className="size-10 text-lg flex items-center justify-center">▢</div>
            </div>
            <div onClick={window.Main.Close} className="undraggable px-1 hover:bg-red-500 hover:text-white">
              <div className="size-10 text-lg flex items-center justify-center"> &#10005;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
