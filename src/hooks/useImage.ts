import { useState, useEffect } from "react";

interface UseImageProps {
  src: string;
}

export const useImage = ({ src }: UseImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) return;

    let isMounted = true;
    const img = new Image();
    img.src = src;

    img.onload = () => {
      if (isMounted) {
        setCurrentSrc(src);
        setLoading(false);
      }
    };

    img.onerror = () => {
      if (isMounted) {
        setError(true);
        setLoading(false);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return { src: currentSrc, error, loading };
};
