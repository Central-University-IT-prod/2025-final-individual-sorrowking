import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';

export const Load = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    
    // Create new image object to handle loading
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isLoading && <Loader variant="dots" />}
      
      <img
        src={currentSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 300ms ease',
        }}
      />
    </div>
  );
};
