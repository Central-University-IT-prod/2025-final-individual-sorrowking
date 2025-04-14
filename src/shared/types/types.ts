type Difficulty = 'easy' | 'medium' | 'hard'
type TargetResult = 'distance' | 'weight' | 'time' | 'repeats'
type AverageValue = Partial<Record<TargetResult, number>>;

interface Exercise {
  exerciseId: string;
  description: string;
  title: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  equipment: string[];
  tags: string[];
  targetResult: TargetResult[];
  averageValues: AverageValue;
}


interface SelectedExercise {
  exercise: Exercise;
  uuid: string;
  targetValues: Record<string, number>; 
}

interface Training {
  id: string;
  title: string;
  exercises: SelectedExercise[];
  createdAt: Date;
  oneshot?: boolean;
  description?: string;
}

interface User {
  name: string;
  weight: number; // кг
  gender: 'male' | 'female';
  height: number; // см
  age: number; // лет
  coins: number;
  firstVisit: boolean; 
  currentExperience: number;
  currentLevel: number;
  unlockedAchievements: number[];
  avatar: UserAvatar;
  statistics: UserStatistics
  
}

interface LockedItem {
  name: string;
  requirement: 
    | "shop" 
    | `level_${number}` 
    | `achievement_${number}`;
}

interface UserAvatar {
  clothes: string;
  eyeBrow: string;
  eyes: string;
  hair: string;
  head: string;
  nose: string;
  shoes: string;
  hairColor: string;
  clothingColor: string;
  earring?: string;
  face?: string;
  facialHair?: string;
  glasses?: string;
  hat?: string;
  outfit?: string;
  lockedItems: LockedItem[],
}


interface UserStatistics {
  totalTrainings: number;
  totalDuration: number;
  totalCalories: number;
  totalExercises: number;
  trainingsByDifficulty: { easy: 0, medium: 0, hard: 0 },
}

interface CustomizationItemGroup {
  title: string;
  type: keyof UserAvatar;
  items: string[];
  optional?: boolean,
  colorType?: 'skinColor' | 'hairColor' | 'clothingColor',
};

interface CustomizationColorGroup {
  title: string,
  type: 'skinColor' | 'clothingColor' | 'hairColor'
  colors: string []
}

export interface  Achievement {
  title: string;
  description: string;
  unlockedItem: string;
  unlockedItemName: string;
}

export type {Difficulty, 
            TargetResult, 
            AverageValue, 
            Exercise, 
            SelectedExercise, 
            Training, 
            User,
            LockedItem,
            UserAvatar,
            UserStatistics,
            CustomizationItemGroup,
            CustomizationColorGroup}