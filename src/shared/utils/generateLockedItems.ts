import { ACHIEVEMENT_DATA, LEVEL_UNLOCKS, SHOP_UNLOCKS } from "../constants/userProgression";
import { LockedItem } from "../types/types";

// генерация закрытых для юзера предметов
export const generateLockedItems = (): LockedItem[] => {
  const lockedItems: LockedItem[] = [];

  Object.entries(ACHIEVEMENT_DATA).forEach(([id, achievement]) => {
    if (achievement.unlockedItem) {
      lockedItems.push({
        name: achievement.unlockedItem,
        requirement: `achievement_${Number(id)}` as const,
      });
    }
  });

  Object.entries(LEVEL_UNLOCKS).forEach(([level, reward]) => {
    if (reward.item) {
      lockedItems.push({
        name: reward.item,
        requirement: `level_${Number(level)}` as const,
      });
    }
  });

  Object.keys(SHOP_UNLOCKS).forEach((itemName) => {
    lockedItems.push({
      name: itemName,
      requirement: 'shop',
    });
  });

  return lockedItems;
};
