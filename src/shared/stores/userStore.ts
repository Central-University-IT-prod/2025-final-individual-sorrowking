import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Training, User, UserAvatar, UserStatistics } from '../types/types';
import { calculateCaloriesBurned, checkTagsCount, getTrainingDifficulty, getTrainingDuration } from '../utils/trainingHelpers';
import { MAX_LEVEL, TOTAL_ACHIEVEMENTS, USER_LEVEL_EXPERIENCE,  LEVEL_UNLOCKS, SHOP_UNLOCKS} from '../constants/userProgression';
import { generateLockedItems } from '../utils/generateLockedItems';

interface AchievementProgress {
  progress: number,
  max: number
}
interface UserStore {
  user: User;
  updateUser: (newData: Partial<User>) => void;
  resetUser: () => void;
  updateCoins: (delta: number) => void;
  addExperience: (amount: number) => void;
  updateAvatar: (avatarPart: Partial<UserAvatar>) => void;
  unlockAchievement: (achievementId: number) => void;
  checkAllAchievementsUnlocked: () => boolean;
  saveCompletedTraining: (training: Training) => void;
  getAchievementProgress: (achievementId: number) => AchievementProgress;
  purchaseItem: (itemName: string) => void;
}




const defaultAvatar: UserAvatar = {
  clothes: 'MaleTop.001',
  eyeBrow: 'EyeBrow.001',
  eyes: 'Eyes.001',
  hair: 'Hair.001',
  head: 'Head.001',
  nose: 'Nose.001',
  shoes: 'Shoes.001',
  hairColor: "#F5E6C8",
  clothingColor: "#FFFFFF",
  lockedItems: generateLockedItems()
};


const defaultStatistics: UserStatistics = {
  totalTrainings: 0,
  totalDuration: 0,
  totalCalories: 0,
  totalExercises: 0,
  trainingsByDifficulty: {easy: 0, medium: 0, hard: 0}
}

const defaultUser: User = {
  name: '',
  weight: 70,
  gender: 'male',
  height: 175,
  age: 25,
  coins: 0,
  currentExperience: 0,
  currentLevel: 1,
  unlockedAchievements: [],
  firstVisit: true,
  avatar: defaultAvatar,
  statistics: defaultStatistics,
}


const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: defaultUser,

      updateUser: (newData) => {
        set((state) => {
          const newUser = {
            ...state.user,
            ...newData,
            firstVisit: false,
          };
      
          if (newData.gender && newData.gender !== state.user.gender) {
            const currentClothes = state.user.avatar.clothes;
            const [_, suffix] = currentClothes.split(/\.(.+)/); 
            const newPrefix = newData.gender === 'female' ? 'FemaleTop' : 'MaleTop';
            const newClothes = `${newPrefix}.${suffix || '001'}`;
      
            return {
              user: {
                ...newUser,
                avatar: {
                  ...state.user.avatar,
                  clothes: newClothes,
                }
              },
            };
          }
      
          return { user: newUser };
        });
      },

      updateAvatar: (avatarPart) => {
        set((state) => ({
          user: {
            ...state.user,
            avatar: {
              ...state.user.avatar,
              ...avatarPart
            }
          },
        }));
      },

      resetUser: () => {
        set({
          user: defaultUser,
        });
      },

      updateCoins: (delta) => {
        const currentCoins = get().user.coins;

        const newCoins = Math.max(0, currentCoins + delta);
        
        set((state) => ({
          user: {
            ...state.user,
            coins: newCoins,
          },
        }));
      },

      addExperience: (amount) => {
        set((state) => {
          const originalLevel = state.user.currentLevel;
          let newExperience = state.user.currentExperience + amount;
          let newLevel = originalLevel;
          let coinsToAdd = 0;
          const levelsUnlocked: number[] = [];
          let newClothes = state.user.avatar.clothes;
      
          while (newLevel < MAX_LEVEL) {
            const nextLevel = newLevel + 1;
            const requiredExp = USER_LEVEL_EXPERIENCE[nextLevel];
            
            if (newExperience >= requiredExp) {
              newLevel = nextLevel;
              levelsUnlocked.push(newLevel);
              coinsToAdd += LEVEL_UNLOCKS[nextLevel].coins;
              newExperience -= requiredExp;
      
              // открытие соответствующего состояния тела
              const statusReward = LEVEL_UNLOCKS[nextLevel]?.status;
              if (statusReward) {
                const genderPrefix = state.user.gender === 'male' ? 'Male' : 'Female';
                newClothes = `${genderPrefix}${statusReward}`;
              }
            } else {
              break;
            }
          }
      
          if (newLevel >= MAX_LEVEL) {
            newExperience = USER_LEVEL_EXPERIENCE[MAX_LEVEL]
          }
      
          const itemsToRemove = levelsUnlocked
            .map(level => ({
              name: LEVEL_UNLOCKS[level]?.item,
              requirement: `level_${level}` as const
            }))
            .filter(item => item.name !== undefined);
      
          const newLockedItems = state.user.avatar.lockedItems.filter(lockedItem => 
            !itemsToRemove.some(toRemove => 
              lockedItem.name === toRemove.name && 
              lockedItem.requirement === toRemove.requirement
            )
          );
      
          return {
            user: {
              ...state.user,
              currentLevel: newLevel,
              currentExperience: newExperience,
              coins: state.user.coins + coinsToAdd,
              avatar: {
                ...state.user.avatar,
                clothes: newClothes,
                lockedItems: newLockedItems
              }
            },
          };
        });
      },

      unlockAchievement: (achievementId) => {
        set((state) => {
          if (!state.user.unlockedAchievements.includes(achievementId)) {
            const newLockedItems = state.user.avatar.lockedItems.filter(
              item => item.requirement !== `achievement_${achievementId}`
            );
      
            return {
              user: {
                ...state.user,
                unlockedAchievements: [...state.user.unlockedAchievements, achievementId],
                avatar: {
                  ...state.user.avatar,
                  lockedItems: newLockedItems,
                }
              }
            };
          }
          return state;
        });
          
        // проверка на пятую ачивку
        setTimeout(() => {
          if (achievementId !== 5 && get().checkAllAchievementsUnlocked()) {
            get().unlockAchievement(5);
          }
        }, 0);
      },

      checkAllAchievementsUnlocked: () => {
        const { unlockedAchievements } = get().user;
        return [1, 2, 3, 4].every(id => unlockedAchievements.includes(id));  // надо будет менять если ачивок больше
      },

      saveCompletedTraining: (training) => {
        set(state => {
          const duration = getTrainingDuration(training);
          const calories = calculateCaloriesBurned(state.user, training);
          const exerciseCount = training.exercises.length;
          const difficultyScore = getTrainingDifficulty(training);
          
          let difficulty: keyof UserStatistics['trainingsByDifficulty'] = 'easy';
          if (difficultyScore >= 1.5 && difficultyScore < 2.5) {
            difficulty = 'medium';
          } else if (difficultyScore >= 2.5) {
            difficulty = 'hard';
          }
      
          return {
            user: {
              ...state.user,
              statistics: {
                ...state.user.statistics,
                totalTrainings: state.user.statistics.totalTrainings + 1,
                totalDuration: state.user.statistics.totalDuration + duration,
                totalCalories: state.user.statistics.totalCalories + calories,
                totalExercises: state.user.statistics.totalExercises + exerciseCount,
                trainingsByDifficulty: {
                  ...state.user.statistics.trainingsByDifficulty,
                  [difficulty]: state.user.statistics.trainingsByDifficulty[difficulty] + 1
                }
              }
            }
          };
        });
        
        const userState = get().user;

        // Ачивмент 1: 1 тренировка
        if (!userState.unlockedAchievements.includes(1)) {
          get().unlockAchievement(1);
        }

        // Ачтвмент 2: 10+ тренировок проведено
        if (userState.statistics.totalTrainings + 1 >= 10 && 
            !userState.unlockedAchievements.includes(2)) {
          get().unlockAchievement(2);
        }

        // Ачивмент 3: Высокая сложность тренировки
        const difficultyScore = getTrainingDifficulty(training);
        if (difficultyScore >= 2.5 && 
            !userState.unlockedAchievements.includes(3)) {
          get().unlockAchievement(3);
        }

        // Ачивмент 4: ≥3 кардио упражнений в тренировке
        const cardioCount = checkTagsCount(training, 'кардио');
        if (cardioCount >= 3 && 
            !userState.unlockedAchievements.includes(4)) {
          get().unlockAchievement(4);
        }
      },

      getAchievementProgress: (achievementId) => {
        const user = get().user;
        
        switch(achievementId) {
         // Ачивмент 1: 1 тренировка
          case 1: 
            return {progress: user.unlockedAchievements.includes(1) ? 1 : 0, max: 1}
          // Ачтвмент 2: 10+ тренировок проведено
          case 2: {
            return {progress: user.statistics.totalTrainings, max: 10}
          }
          // Ачивмент 3: Высокая сложность тренировки
          case 3: 
            return {progress: user.unlockedAchievements.includes(3) ? 1 : 0, max: 1}
          // Ачивмент 4: ≥3 кардио упражнений в тренировке
          case 4: 
            return {progress: user.unlockedAchievements.includes(4) ? 1 : 0, max: 1}
          // Ачивмент 5: получены все достижения
          case 5: {
            const achievementsLength = Math.min(user.unlockedAchievements.length, TOTAL_ACHIEVEMENTS - 1);
            return {progress: achievementsLength, max: TOTAL_ACHIEVEMENTS - 1}
          }
          default:
            return {progress: 1, max: 1}

        }
      },

      purchaseItem: (itemName) => {
        set((state) => {
          const price = SHOP_UNLOCKS[itemName];
          const currentCoins = state.user.coins;
          
          if (
            typeof price !== 'number' ||                // если айтем существует в магазине
            currentCoins < price ||                     // если монет недостаточно
            !state.user.avatar.lockedItems.some(        // если айтем не закрыт
              item => item.name === itemName && 
                     item.requirement === 'shop'
            )
          ) {
            return state;
          }

          return {
            user: {
              ...state.user,
              coins: currentCoins - price,
              avatar: {
                ...state.user.avatar,
                lockedItems: state.user.avatar.lockedItems.filter(
                  item => !(item.name === itemName && item.requirement === 'shop')
                ),
              }
            }
          };
        });
      }

      
    }),
    {
      name: 'user-store',
    }
  )
);


export default useUserStore;