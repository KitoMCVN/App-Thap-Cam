import React from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"a"> &
  React.ComponentPropsWithoutRef<"button">;

const Button: React.FC<ButtonProps> = ({ href, onClick, children, className = "", ...props }) => {
  const ButtonStyle =
    `text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 transition ${className}`;

  if (href) {
    return (
      <a href={href} className={ButtonStyle} role="button" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={ButtonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
