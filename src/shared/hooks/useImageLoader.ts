import { useEffect, useState } from 'react';
import { getImage } from '@/shared/utils/indexDB';

const useImageLoader = (imageKey: string | undefined) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!imageKey) {
      setImageSrc(null);
      setIsLoading(false);
      return;
    }

    if (imageKey.startsWith('image_')) {
      getImage(imageKey)
        .then((base64) => {
          if (base64) {
            const img = new Image();

            img.src = base64;
            img.onload = () => {
              setImageSrc(base64);
              setIsLoading(false);
            };
            img.onerror = () => {
              console.error('Failed to load image');
              setImageSrc(null);
              setIsLoading(false);
            };
          }
        })
        .catch((error) => {
          console.error('Failed to fetch image:', error);
          setImageSrc(null);
          setIsLoading(false);
        });
    } else {
      setImageSrc(null);
      setIsLoading(false);
    }
  }, [imageKey]);

  return { imageSrc, isLoading };
};

export default useImageLoader;