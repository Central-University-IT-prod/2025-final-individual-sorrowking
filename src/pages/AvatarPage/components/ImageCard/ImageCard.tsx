import { Card, Badge, Image } from '@mantine/core'; 
import { IconCheck, IconCircleX, IconCoin, IconTrophy, IconLock } from '@tabler/icons-react';
import cx from 'classnames';
import styles from './ImageCard.module.scss';
import { CUSTOMIZATION_ITEM_NAMES } from '@/shared/constants/userCharacter';
interface ImageCardProps {
  item?: string;
  isSelected?: boolean;
  isRemove?: boolean;
  onClick?: () => void;
  onLockClick?: () => void;
  locked?: boolean;
  unlockType?: 'shop' | 'level' | 'achievement';
  unlockValue?: number | undefined;
}

const ImageCard = ({ 
  item, 
  isSelected, 
  isRemove, 
  onClick,
  onLockClick,
  locked,
  unlockType,
  unlockValue
}: ImageCardProps) => {

  const handleClick = () => {
    if (locked) {
      onLockClick?.();
    } else {
      onClick?.();
    }
  };

  return (
    <>
      <Card
        className={cx(styles.imageCard, { 
          [styles.selected]: isSelected,
          [styles.removeCard]: isRemove,
          [styles.locked]: locked
        })}
        radius="md"
        onClick={handleClick}
      >
        <div className={styles.imageWrapper}>
          {isRemove ? (
            <div className={styles.removeContent}>
              <IconCircleX size={24} className={styles.trashIcon} aria-label="Без предмета"/>
            </div>
          ) : (
            <>
              <Image 
                src={`/assets/glbPreviews/${item}.png`} 
                alt={CUSTOMIZATION_ITEM_NAMES[item as keyof typeof CUSTOMIZATION_ITEM_NAMES]} 
                className={cx(styles.image, { [styles.lockedImage]: locked })}
              />
              
              {locked && (
                <>
                  <div className={styles.lockOverlay}>
                    <IconLock size={32} className={styles.lockIcon} aria-label="Заблокированный предмет"/>
                  </div>
                  
                  <div className={styles.unlockBadge}>
                    {unlockType === 'shop' && (
                      <Badge leftSection={<IconCoin size={14} />} color="yellow" aria-label="Монеты">
                        {unlockValue}
                      </Badge>
                    )}
                    {unlockType === 'achievement' && (
                      <Badge leftSection={<IconTrophy size={14} />} color="orange" aria-label="Достижения">
                        АЧ.
                      </Badge>
                    )}
                    {unlockType === 'level' && (
                      <Badge color="blue">
                        УР.{unlockValue}
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          
          {isSelected && !locked && (
            <div className={styles.checkIcon}>
              <IconCheck size={18} color="white" aria-label="Выбрано"/>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
export default ImageCard;