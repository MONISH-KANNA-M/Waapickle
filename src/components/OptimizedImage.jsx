import React, { useState, useRef, useEffect } from "react";
import {
  optimizeImageUrl,
  getFallbackImage,
  isValidImageUrl,
  generatePlaceholder,
} from "../utils/imageUtils";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  fallbackSrc,
  category = "default",
  lazy = true,
  placeholder = true,
  width = 600,
  height = 400,
  quality = 80,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(lazy ? null : src);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, lazy]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      const fallback = fallbackSrc || getFallbackImage(category);
      setImageSrc(fallback);
    }
  };

  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) {
      return fallbackSrc || getFallbackImage(category);
    }

    // Handle imported module images (they have a default property)
    if (typeof originalSrc === 'object' && originalSrc.default) {
      return originalSrc.default;
    }

    // Handle string URLs
    if (typeof originalSrc === 'string') {
      if (!isValidImageUrl(originalSrc)) {
        return fallbackSrc || getFallbackImage(category);
      }
      return optimizeImageUrl(originalSrc, { width, height, quality });
    }

    return fallbackSrc || getFallbackImage(category);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading state */}
      {placeholder && !imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Skeleton loader */}
      {!imageLoaded && <div className="absolute inset-0 skeleton"></div>}

      {/* Actual image */}
      {imageSrc && (
        <img
          src={getOptimizedSrc(imageSrc)}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading={lazy ? "lazy" : "eager"}
          {...props}
        />
      )}

      {/* Error state */}
      {imageError && imageLoaded && (
        <div className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
          Fallback Image
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
