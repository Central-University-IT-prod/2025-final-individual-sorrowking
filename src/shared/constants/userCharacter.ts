import { CustomizationColorGroup, CustomizationItemGroup } from "../types/types";

export const CUSTOMIZATION_ITEM_GROUPS: CustomizationItemGroup[] = [
  {
    title: 'Брови',
    type: 'eyeBrow',
    items: [
      'EyeBrow.001', 'EyeBrow.002', 'EyeBrow.003',
      'EyeBrow.004', 'EyeBrow.005', 'EyeBrow.006',
      'EyeBrow.007', 'EyeBrow.008', 'EyeBrow.009'
    ],
    colorType: 'hairColor'
  },
  {
    title: 'Глаза',
    type: 'eyes',
    items: [
      'Eyes.001', 'Eyes.002', 'Eyes.003', 'Eyes.004',
      'Eyes.005', 'Eyes.006', 'Eyes.007', 'Eyes.008',
      'Eyes.009', 'Eyes.010', 'Eyes.011', 'Eyes.012'
    ]
  },
  {
    title: 'Волосы',
    type: 'hair',
    items: [
      'Hair.001', 'Hair.002', 'Hair.003', 'Hair.004',
      'Hair.005', 'Hair.006', 'Hair.007', 'Hair.008'
    ],
    colorType: 'hairColor'
  },
  {
    title: 'Нос',
    type: 'nose',
    items: ['Nose.001', 'Nose.002', 'Nose.003']
  },
  {
    title: 'Обувь',
    type: 'shoes',
    items: ['Shoes.001', 'Shoes.002', 'Shoes.003']
  },

  {
    title: 'Серьги',
    type: 'earring',
    items: [
      'Earring.001', 'Earring.002', 'Earring.003',
      'Earring.004', 'Earring.005', 'Earring.006',
    ],
    optional: true,
  },
  {
    title: 'Волосы на лице',
    type: 'facialHair',
    items: ['FacialHair.001', 'FacialHair.002', 'FacialHair.003', 'FacialHair.004', 'FacialHair.005', 'FacialHair.006'],
    optional: true,
    colorType: 'hairColor'
  },
  {
    title: 'Очки',
    type: 'glasses',
    items: ['Glasses.001', 'Glasses.002', 'Glasses.003', 'Glasses.004'],
    optional: true,
  },
  {
    title: 'Шляпа',
    type: 'hat',
    items: [
      'Hat.001', 'Hat.002', 'Hat.003',
      'Hat.004', 'Hat.005', 'Hat.006',
      'Hat.007', 'Hat.008'
    ],
    optional: true,
  },
  {
    title: 'Костюмы',
    type: 'outfit',
    items: ['Outfit.001', 'Outfit.002'],
    optional: true,
  },
  {
    title: 'Лицевые украшения',
    type: 'face',
    items: ['Face.001', 'Face.002', 'Face.003', 'Face.004', 'Face.005', 'Face.006'],
    optional: true,
  }
];

export const CUSTOMIZATION_ITEM_NAMES = {
  'EyeBrow.001': 'Брови 1',
  'EyeBrow.002': 'Брови 2',
  'EyeBrow.003': 'Брови 3',
  'EyeBrow.004': 'Брови 4',
  'EyeBrow.005': 'Брови 5',
  'EyeBrow.006': 'Брови 6',
  'EyeBrow.007': 'Брови 7',
  'EyeBrow.008': 'Брови 8',
  'EyeBrow.009': 'Брови 9',
  'Eyes.001': 'Глаза обычные',
  'Eyes.002': 'Глаза с длинными ресницами',
  'Eyes.003': 'Глаза с короткими ресницами',
  'Eyes.004': 'Глаза c белыми точками',
  'Eyes.005': 'Злые глаза',
  'Eyes.006': 'Добрые глаза',
  'Eyes.007': 'Усталые глаза',
  'Eyes.008': 'Глаза > <',
  'Eyes.009': 'Глаза-спирали',
  'Eyes.010': 'Глаза-крестики',
  'Eyes.011': 'Глаза-сердечки',
  'Eyes.012': 'Добрые глаза с ресницами',
  'Hair.001': 'Волосы 1',
  'Hair.002': 'Волосы 2',
  'Hair.003': 'Волосы 3',
  'Hair.004': 'Волосы 4',
  'Hair.005': 'Волосы 5',
  'Hair.006': 'Волосы 6',
  'Hair.007': 'Волосы 7',
  'Hair.008': 'Волосы 8',
  'Nose.001': 'Нос 1',
  'Nose.002': 'Нос 2',
  'Nose.003': 'Нос 3',
  'Shoes.001': 'Кроссовки',
  'Shoes.002': 'Сандали',
  'Shoes.003': 'Ботинки',
  'Earring.001': 'Серебряные кольца',
  'Earring.002': 'Золотые кольца',
  'Earring.003': 'Золотое кольцо',
  'Earring.004': 'Золотые серьги-шары',
  'Earring.005': 'Серебряные серьги-шары',
  'Earring.006': 'Золотое кольцо',
  'FacialHair.001': 'Усы дракона',
  'FacialHair.002': 'Плоские усы',
  'FacialHair.003': 'Борода',
  'FacialHair.004': 'Усы джентльмена',
  'FacialHair.005': 'Усы-бабочка',
  'FacialHair.006': 'Уточненные усы',
  'Glasses.001': 'Очки-сердца',
  'Glasses.002': 'Защитные очки',
  'Glasses.003': 'Крутые очки',
  'Glasses.004': 'Солнцезащитные очки',
  'Hat.001': 'Корона',
  'Hat.002': 'Кепка',
  'Hat.003': 'Новогодняя шапка',
  'Hat.004': 'Цилиндр',
  'Hat.005': 'Шляпа пирата',
  'Hat.006': 'Головокружение',
  'Hat.007': 'Наушники',
  'Hat.008': 'Тыква',
  'Outfit.001': 'Костюм кролика',
  'Outfit.002': 'Костюм кота',
  'Face.001': 'Розовые щёки',
  'Face.002': 'Недовольство',
  'Face.003': 'Восклицательный знак',
  'Face.004': 'Слёзы',
  'Face.005': 'Три полоски',
  'Face.006': 'Звёзды',
}

const HAIR_COLORS: string[] = [
  "#F5E6C8",
  "#E6CEA8", 
  "#C8A178",  
  "#A66A4D",
  "#6B4423", 
  "#4A3120",
  "#8B4513",
  "#B55239", 
  "#00FFFF",
  "#4B0082", 
  "#36454F", 
  "#FFFFFF" 
];

const CLOTHING_COLORS: string[] = [
  "#FFFFFF",
  "#000000", 
  "#808080",
  "#F5F5DC", 
  "#8B0000", 
  "#000080", 
  "#E6E6FA",
  "#FFD700",
  "#FF6F61", 
  "#98FF98",  
  "#FFDB58", 
  "#800080", 
  "#A0522D"  
];

export const CUSTOMIZATION_COLOR_GROUPS: CustomizationColorGroup[] = [
  {
    title: "Цвет волос",
    type: "hairColor",
    colors: HAIR_COLORS
  },
  {
    title: "Цвет одежды",
    type: "clothingColor",
    colors: CLOTHING_COLORS
  }
]

export const COLOR_ITEMS_MAP = {
    clothes: 'clothingColor',
    hair: 'hairColor',
    facialHair: 'hairColor',
    eyeBrow: 'hairColor'
}

