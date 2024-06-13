import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarData } from "../../../../../data/sidebar.data";

const SidebarLinks: React.FC = () => {
  const location = useLocation();
  const SidebarData = sidebarData();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const linkHeigh = 48;

  useEffect(() => {
    const index = SidebarData.findIndex(
      (item) => location.pathname === item.path,
    );
    setActiveIndex(index);
  }, [location.pathname, SidebarData]);

  console.log(activeIndex);

  return (
    <div className="relative">
      {SidebarData.map((item) => {
        const formattedNotification =
          item.notification === "new"
            ? "new"
            : item.notification
              ? new Intl.NumberFormat("en-US").format(Number(item.notification))
              : undefined;

        return (
          <div
            key={item.id}
            className="relative z-[1] overflow-hidden rounded-lg"
            style={{ height: linkHeigh + "px" }}
          >
            <Link className={`block w-full px-3 py-3`} to={item.path as string}>
              <div className="flex items-center">
                <div className="mr-2">{item.icon}</div>
                <div>{item.title}</div>
                {formattedNotification ? (
                  <div
                    className={`ml-auto rounded-lg ${
                      formattedNotification === "new"
                        ? "bg-yellow-600"
                        : "bg-rose-950"
                    } px-2 pt-[2px] text-sm text-rose-50`}
                  >
                    {formattedNotification === "new"
                      ? "New"
                      : formattedNotification}
                  </div>
                ) : null}
              </div>
            </Link>
          </div>
        );
      })}
      {activeIndex !== null && (
        <motion.div
          className="absolute top-0 z-0 h-12 w-full rounded-lg bg-rose-100"
          initial={{ y: activeIndex * linkHeigh }}
          animate={{ y: activeIndex * linkHeigh }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      )}
    </div>
  );
};

export default SidebarLinks;
