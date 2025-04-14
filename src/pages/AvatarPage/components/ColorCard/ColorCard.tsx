import { ComponentPropsWithoutRef } from 'react';
import styles from './ColorCard.module.scss';
import { IconCheck } from '@tabler/icons-react';

interface ColorCardProps extends ComponentPropsWithoutRef<'div'> {
  color: string;
  isSelected?: boolean;
  onClick: () => void;
}

const ColorCard = ({ color, onClick, isSelected, className, ...props }: ColorCardProps) => {
  return (
    <div
      className={`${styles.colorCard} ${className || ''}`}
      data-selected={isSelected}
      style={{ backgroundColor: color }}
      onClick={onClick}
      {...props}
    >
      {isSelected && (
        <div className={styles.colorCheckIcon}>
          <IconCheck size={16} color="white" aria-label="Отмечено"/>
        </div>
      )}
    </div>
  );
};

export default ColorCard;