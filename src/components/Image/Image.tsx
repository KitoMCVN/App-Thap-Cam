import React, { Suspense } from "react";
import { useImage } from "../../hooks/";

interface ReactImageProps {
  src: string;
  alt?: string;
  fallback?: React.ReactNode;
  loader?: React.ReactNode;
  className?: string;
}

const ReactImage: React.FC<ReactImageProps> = ({ src, alt, fallback, loader, className }) => {
  const { src: loadedSrc, error, loading } = useImage({ src });

  if (loading) {
    return <div className={`size-full bg-slate-500 animate-pulse ${className}`}>{loader || ""}</div>;
  }

  if (error) {
    return <div className={`size-full bg-red-300 ${className}`}>{fallback || ""}</div>;
  }

  return <img src={loadedSrc as string} alt={alt} className={className} />;
};

export const Image: React.FC<ReactImageProps> = (props) => (
  <Suspense fallback={<div className={`size-full ${props.className}`}>{props.loader || "Loading..."}</div>}>
    <ReactImage {...props} />
  </Suspense>
);

export default Image;
