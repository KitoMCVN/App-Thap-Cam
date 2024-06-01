import React from "react";

interface ErrorWarningProps {
  error?: string;
  warning?: string;
}

const Error: React.FC<ErrorWarningProps> = ({ error, warning }) => {
  return (
    <div>
      {error && <div className="bg-red-800">{error}</div>}
      {warning && <div className="bg-yellow-800">{warning}</div>}
    </div>
  );
};

export default Error;
