import { Achievement } from "../types/types";

interface LevelRewardType {
  coins: number,
  item: string,
  status?: string
}


export const SHOP_UNLOCKS: Record<string, number> = {
  'FacialHair.004': 300,
  'FacialHair.005': 300,
  'FacialHair.006': 300,
  'Glasses.001': 500,
  'Glasses.002': 500,
  'Earring.001': 200,
  'Earring.002': 200,
  'Earring.003': 200,
  'Earring.005': 200,
  'Earring.006': 200,
  'Eyes.004': 400,
  'Eyes.005': 400,
  'Eyes.006': 400,
  'Eyes.007': 400,
  'Eyes.009': 400,
  'Eyes.010': 400,
  'Hat.002': 600,
  'Hat.003': 600,
  'Hat.004': 600,
  'Hat.007': 600,
  'Shoes.002': 700,
  'Face.002': 500,
  'Face.003': 500,
  'Face.004': 500,
  'Face.005': 500
}

export const LEVEL_UNLOCKS: Record<number, LevelRewardType> = {
  2: {
    coins: 300,
    item: 'Earring.004'
  },
  3: {
    coins: 300,
    item: 'Glasses.004'
  },
  4: {
    coins: 400,
    item: 'Eyes.008',
    status: 'Top.002'
  },
  5: {
    coins: 400,
    item: 'Shoes.003'
  },
  6: {
    coins: 400,
    item: 'Hat.005'
  },
  7: {
    coins: 500,
    item: 'Face.001',
    status: 'Top.003'
  },
  8: {
    coins: 500,
    item: 'Hat.008'
  },
  9: {
    coins: 500,
    item: 'Outfit.001'
  },
  10: {
    coins: 700,
    item: 'Hat.001',
    status: 'Top.004'

  },
}

export const USER_LEVEL_EXPERIENCE: Record<number, number> = {
  2: 200,
  3: 250,
  4: 300,
  5: 350,
  6: 375,
  7: 400,
  8: 425,
  9: 450,
  10: 500
}

export const MAX_LEVEL = 10


export const ACHIEVEMENT_DATA: Record<number, Achievement> = {
  1: {
    title: "Любитель фитнеса",
    description: "Провести одну тренировку",
    unlockedItem: "Eyes.011",
    unlockedItemName: "Глаза-сердечки"
  },
  2: {
    title: "Фитнес-эксперт",
    description: "Провести десять тренировок",
    unlockedItem: "Outfit.002",
    unlockedItemName: "Костюм кота"
  },
  3: {
    title: "Все выше и выше",
    description: "Провести одну сложную тренировку",
    unlockedItem: "Face.006",
    unlockedItemName: "Звёзды"
  },
  4: {
    title: "Голова кругом",
    description: "Провести тренировку с 3+ кардио-упражнениями",
    unlockedItem: "Hat.006",
    unlockedItemName: "Головокружение"
  },
  5: {
    title: "Достигатель достижений",
    description: "Получить все достижения",
    unlockedItem: "Glasses.003",
    unlockedItemName: "Крутые очки"
  }
}

export const TOTAL_ACHIEVEMENTS = 5