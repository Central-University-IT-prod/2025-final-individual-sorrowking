import { useRef } from 'react';
import styles from './ImageSection.module.scss'
import { Text } from '@mantine/core';

interface ImageSectionProps {
  preview: string | null;
  onUpload: (file: FileList) => void;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ preview, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) onUpload(e.dataTransfer.files);
  };

  return (
    <>
      <Text size="md" my='10px'>Изображение</Text>
      <div
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className={styles.dropzone__preview} />
        ) : (
          <p>Перетащите изображение сюда или кликните для загрузки</p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          hidden
          onChange={(e) => e.target.files?.[0] && onUpload(e.target.files)}
          accept=".jpg,.jpeg,.png,.svg"
        />
      </div>
    </>
  );
};
