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
    <header id="title" className="draggable fixed top-0 w-full">
      <div className="">
        <div className="flex justify-between">
          <div className=""></div>
          <div className="flex overflow-hidden rounded-tr-lg">
            <div
              onClick={window.Main.Minimize}
              className="undraggable px-1 hover:bg-gray-300"
            >
              <div className="flex size-5 items-center justify-center text-lg">
                –
              </div>
            </div>
            <div
              onClick={handleToggle}
              className="undraggable px-1 hover:bg-gray-300"
            >
              <div className="flex size-5 items-center justify-center text-lg">
                ▢
              </div>
            </div>
            <div
              onClick={window.Main.Close}
              className="undraggable px-1 hover:bg-red-500 hover:text-white"
            >
              <div className="flex size-5 items-center justify-center text-lg">
                &#10005;
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TitleBar;
