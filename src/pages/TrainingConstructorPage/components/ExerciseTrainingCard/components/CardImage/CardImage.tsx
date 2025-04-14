import { Image, LoadingOverlay, Card } from '@mantine/core';
import useImageLoader from "@/shared/hooks/useImageLoader";

interface CardImageProps {
  exerciseId: string;
  title: string;
  children: React.ReactNode;
}

export const CardImage: React.FC<CardImageProps> = ({ exerciseId, title, children }) => {
  const { imageSrc, isLoading } = useImageLoader(exerciseId);

  return (
    <Card.Section pos="relative">
      <Image 
        src={imageSrc || ""} 
        alt={title} 
        height='150px' 
        width='100%' 
        fit='cover'
      />
      <LoadingOverlay
        visible={isLoading}
        overlayProps={{ blur: 2 }}
        loaderProps={{ size: "sm", color: "orange" }}
      />
      {children}
    </Card.Section>
  );
};