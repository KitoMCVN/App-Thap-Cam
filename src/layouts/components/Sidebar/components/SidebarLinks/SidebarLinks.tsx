import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarData } from "../../../../../data/sidebar.data";
import { Tooltip } from "../../../../../components/Tooltip";

interface SidebarLinksProps {
  className?: string;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ className }) => {
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
    <div className={`relative ${className}`}>
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
            <Tooltip className="w-full" content={item.title}>
              <Link
                className={`block w-full px-3 py-3`}
                to={item.path as string}
              >
                <div className="flex items-center justify-center md:justify-normal">
                  <div className="md:mr-2">{item.icon}</div>
                  <div className="hidden md:block">{item.title}</div>
                  {formattedNotification ? (
                    <div
                      className={`ml-auto hidden rounded-lg md:block ${
                        formattedNotification === "new"
                          ? "bg-yellow-600"
                          : "bg-rose-950 dark:bg-rose-400"
                      } px-2 pt-[2px] text-sm text-rose-50`}
                    >
                      {formattedNotification === "new"
                        ? "New"
                        : formattedNotification}
                    </div>
                  ) : null}
                </div>
              </Link>
            </Tooltip>
          </div>
        );
      })}
      {activeIndex !== null && (
        <motion.div
          className="absolute top-0 z-0 h-12 w-full rounded-lg bg-rose-100 dark:bg-neutral-700"
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
