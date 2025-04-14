import { useEffect, useState } from 'react';
import { Modal, Box, Text, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconInfoCircle } from '@tabler/icons-react';
import styles from './TutorialModal.module.scss'
import { TutorialItem } from '../../constants';


interface TutorialModalProps {
  opened: boolean;
  onClose: () => void;
  items: TutorialItem[];
}

export const TutorialModal = ({ opened, onClose, items }: TutorialModalProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    if (opened) {
      setActiveSlide(0);
    }
  }, [opened]);
  
  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title={<Text size="xl" fw={700}>Информация о странице</Text>}
      size="xl" 
      padding="xl"
      closeButtonProps={{
        'aria-label': 'Закрыть окно обучения',
      }}
    >
      <Carousel
        slideSize="100%"
        slideGap="md"
        withControls
        withIndicators
        onSlideChange={setActiveSlide}
        previousControlProps={{
          'aria-label': 'Предыдущий слайд',
        }}
        nextControlProps={{
          'aria-label': 'Следующий слайд',
        }}
      >
        {items.map((item, index) => (
          <Carousel.Slide key={index}>
            <div className={styles.tutorial__imageContainer}>
              <img 
                src={item.image} 
                alt={`Шаг ${index + 1}`}
                className={styles.tutorial__image}
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Box className={styles.tutorial}>
        <Group className={styles.tutorial__group}>
          <IconInfoCircle size={24} color="#FFA577" className={styles.tutorial__icon} aria-label="Информация"/>
          <div>
            <Text size="sm" c="dimmed">
              {items[activeSlide]?.description}
            </Text>
            <Text mt="sm" size="sm" c="#FF8C42" fw={500}>
              Шаг {activeSlide + 1} из {items.length}
            </Text>
          </div>
        </Group>
      </Box>
    </Modal>
  );
};