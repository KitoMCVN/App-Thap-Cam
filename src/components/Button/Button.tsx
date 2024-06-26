import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  href?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"a"> &
  React.ComponentPropsWithoutRef<"button">;

const Button: React.FC<ButtonProps> = ({
  href,
  to,
  onClick,
  children,
  className = "",
  ...props
}) => {
  const buttonStyle = `${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonStyle} role="button" {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonStyle} role="button" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex h-full items-center justify-center bg-neutral-600 px-4 py-1"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
