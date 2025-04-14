
import { Exercise } from "@/shared/types/types";

export const exercises: Exercise[] = [
  {
    exerciseId: "/assets/exercises/jumpingrope.webp",
    title: 'Прыжки на скакалке',
    description: 'Улучшает координацию и выносливость, сжигает до 10 ккал/мин',
    difficulty: 'easy',
    equipment: ['скакалка'],
    tags: ["кардио", "функциональный тренинг"],
    targetResult: ["repeats"],
    text: `1. Возьмите скакалку за ручки, локти прижмите к корпусу
2. Вращайте скакалку предплечьями, сохраняя прямой корпус
3. Прыгайте на носках, минимально сгибая колени
4. Сохраняйте стабильный ритм дыхания`,
    averageValues: { repeats: 150 }
  },
  {
    exerciseId: "/assets/exercises/dumbbell.webp",
    title: 'Жим гантелей стоя',
    description: 'Прорабатывает дельтовидные мышцы и трицепсы',
    difficulty: 'easy',
    equipment: ['гантели'],
    tags: ["сила", "функциональный тренинг"],
    targetResult: ["repeats", "weight"],
    text: `1. Возьмите гантели нейтральным хватом
2. Стойте прямо, ноги на ширине плеч
3. На выдохе выполните жим вверх
4. Контролируйте опускание в 2 раза медленнее`,
    averageValues: { repeats: 12, weight: 14 }
  },
  {
    exerciseId: "/assets/exercises/kettlebell.webp",
    title: 'Махи гирей двумя руками',
    description: 'Развивает взрывную силу и выносливость',
    difficulty: 'hard',
    equipment: ['гиря'],
    tags: ["кардио", "выносливость"],
    targetResult: ["repeats", "weight"],
    text: `1. Поставьте ноги шире плеч, гиря между стоп
2. Наклонитесь с прямой спиной, возьмите гирю
3. Рывком выпрямите ноги, поднимая до уровня груди
4. Держите гирю близко к телу при опускании`,
    averageValues: { repeats: 18, weight: 20 }
  },
  {
    exerciseId: "/assets/exercises/weightlifting.webp",
    title: 'Становая тяга',
    description: 'Задействует 75% мышц тела, развивает общую силу',
    difficulty: 'hard',
    equipment: ['штанга'],
    tags: ["сила", "спина", "функциональный тренинг"],
    targetResult: ["repeats", "weight"],
    text: `1. Стоя перед штангой, ноги на ширине бедер
    2. Наклонитесь с прямой спиной, хват сверху
    3. Поднимите вес за счет мышц ног и ягодиц
    4. В верхней точке сведите лопатки`,
    averageValues: { repeats: 8, weight: 80 }
  },
  {
    exerciseId: "/assets/exercises/pushups.webp",
    title: 'Отжимания',
    description: 'Укрепляет грудные мышцы и трицепсы',
    difficulty: 'easy',
    equipment: ['без оборудования'],
    tags: ["грудь", "трицепс", "базовые упражнения"],
    targetResult: ["repeats"],
    text: `1. Примите упор лежа, ладони под плечами
2. Опустите тело до угла 90° в локтях
3. Сохраняйте прямую линию от головы до пят
4. На выдохе мощно вытолкните тело вверх`,
    averageValues: { repeats: 20 }

  },
  {
    exerciseId: "/assets/exercises/pullups.webp",
    title: "Подтягивания",
    description: "Увеличивает силу широчайших мышц и бицепсов",
    difficulty: "medium",
    equipment: ["турник"],
    tags: ["спина", "бицепс", "функциональный тренинг"],
    targetResult: ["repeats"],
    text: `1. Возьмитесь за перекладину широким хватом
2. Повисните с полностью выпрямленными руками
3. На выдохе подтянитесь до уровня подбородка
4. Медленно опуститесь в исходное положение`,
    averageValues: { repeats: 10 }
  },
  {
    exerciseId: "/assets/exercises/plank.webp",
    title: 'Планка',
    description: 'Укрепляет глубокие мышцы-стабилизаторы',
    difficulty: 'medium',
    equipment: ['без оборудования'],
    tags: ["координация", "статическое напряжение"],
    targetResult: ["time"],
    text: `1. Примите упор лежа на предплечьях
2. Тело образует прямую линию
3. Напрягите ягодицы и мышцы живота
4. Дышите ровно, сохраняйте положение`,
    averageValues: { time: 60 }
  },
  {
    exerciseId: "/assets/exercises/pilates.webp",
    title: 'Пилатес: Сотня',
    description: 'Улучшает нейромышечную связь и осанку',
    difficulty: 'easy',
    equipment: ['коврик'],
    tags: ["гибкость", "мобильность"],
    targetResult: ["repeats"],
    text: `1. Лежа на спине, поднимите ноги под углом 45°
2. Оторвите лопатки от пола, руки вдоль тела
3. Выполняйте короткие махи руками вверх-вниз
4. Синхронизируйте движение с дыханием`,
    averageValues: { repeats: 25 }
  },
  {
    exerciseId: "/assets/exercises/sideplank.webp",
    title: "Боковая планка",
    description: "Улучшает баланс и стабильность корпуса",
    difficulty: "medium",
    equipment: ["коврик"],
    tags: ["кор", "баланс"],
    targetResult: ["time"],
    text: `1. Лежа на боку, обопритесь на локоть
2. Поднимите таз, образуя прямую линию
3. Верхнюю руку вытяните вертикально вверх
4. Удерживайте позицию 20-30 секунд`,
    averageValues: { time: 45 }
  },
  {
    exerciseId: "/assets/exercises/lunges.webp",
    title: "Выпады вперед",
    description: "Развивает симметричную силу нижних конечностей",
    difficulty: "easy",
    equipment: ["без оборудования"],
    tags: ["ноги", "ягодицы"],
    targetResult: ["repeats"],
    text: `1. Встаньте прямо, руки на поясе
2. Сделайте широкий шаг вперед
3. Опуститесь до параллели бедра с полом
4. Оттолкнитесь пяткой для возврата`,
    averageValues: { repeats: 24 }
  },
  {
    exerciseId: "/assets/exercises/superman.webp",
    title: "Супермен",
    description: "Профилактика болей в поясничном отделе",
    difficulty: "easy",
    equipment: ["коврик"],
    tags: ["осанка", "поясница"],
    targetResult: ["time"],
    text: `1. Лежа на животе, вытяните руки вперед
2. Одновременно оторвите грудь и бедра
3. Удерживайте позицию 15-20 секунд
4. Избегайте запрокидывания головы`,
    averageValues: { time: 40 }
  },
  {
    exerciseId: "/assets/exercises/crunches.webp",
    title: "Скручивания",
    description: "Активирует прямую мышцу и формирует кубики",
    difficulty: "easy",
    equipment: ["коврик"],
    tags: ["пресс", "изолирующее упражнение"],
    targetResult: ["repeats"],
    text: `1. Лежа на спине, согните ноги под 90°
2. Руки за головой, локти разведены
3. На выдохе скручивайте корпус к коленям
4. На вдохе медленно возвращайтесь`,
    averageValues: { repeats: 25 }
  },
  {
    exerciseId: "/assets/exercises/dips.webp",
    title: "Отжимания на брусьях",
    description: "Развивает силу верхней части тела",
    difficulty: "medium",
    equipment: ["брусья"],
    tags: ["трицепс", "грудь"],
    targetResult: ["repeats"],
    text: `1. Займите исходное положение на брусьях
2. На вдохе медленно опускайтесь
3. В нижней точке угол в локтях 90°
4. На выдохе мощно вытолкните тело`,
    averageValues: { repeats: 10 }
  },
  {
    exerciseId: "/assets/exercises/running.webp",
    title: 'Бег на длинные дистанции',
    description: 'Улучшает работу сердечно-сосудистой системы',
    difficulty: 'medium',
    equipment: ['кроссовки'],
    tags: ["кардио", "выносливость"],
    targetResult: ["time", "distance"],
    text: `1. Начните с легкого бега для разминки
2. Сохраняйте темп 120-150 уд/мин пульс
3. Держите корпус слегка наклоненным
4. Приземляйтесь на переднюю часть стопы`,
    averageValues: { distance: 5000, time: 1800 }
  },
  {
    exerciseId: "/assets/exercises/scissors.webp",
    title: 'Ножницы вертикальные',
    description: 'Тонизирует мышцы живота и бедер',
    difficulty: 'medium',
    equipment: ['без оборудования'],
    tags: ["пресс", "ноги"],
    targetResult: ["repeats"],
    text: `1. Лежа на спине, руки под ягодицами
2. Поднимите ноги под углом 30°
3. Поочередно скрещивайте ноги
4. Сохраняйте напряжение в животе`,
    averageValues: { repeats: 30 }
  }
];
