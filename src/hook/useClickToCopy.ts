import { useState, useRef } from "react";

interface UseClickToCopy {
  copySuccess: boolean;
  textAreaRef: React.RefObject<HTMLInputElement>;
  copyToClipboard: () => void;
}

export const useClickToCopy = (timeout: number = 10000): UseClickToCopy => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.value;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), timeout);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return { copySuccess, textAreaRef, copyToClipboard };
};
