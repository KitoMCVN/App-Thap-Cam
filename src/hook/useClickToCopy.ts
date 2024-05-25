import { useEffect, useState } from "react";

const useClickToCopy = (text: HTMLElement) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((error) => console.error("Failed to copy:", error));
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return { copied, copyToClipboard };
};

export default useClickToCopy;
