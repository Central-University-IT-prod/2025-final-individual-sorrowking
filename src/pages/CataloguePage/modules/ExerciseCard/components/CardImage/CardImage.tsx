import { Image } from '@mantine/core';
import { ImagePlaceholder } from '@/components';
import useImageLoader from '@/shared/hooks/useImageLoader';

interface CardImageProps {
  exerciseId: string;
  title: string;
}

export const CardImage: React.FC<CardImageProps> = ({ exerciseId, title }) => {
  const { imageSrc, isLoading } = useImageLoader(exerciseId);

  return isLoading ? (
    <ImagePlaceholder />
  ) : (
    <Image
      src={imageSrc || undefined}
      height={200}
      alt={title}
    />
  );
};