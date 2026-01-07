import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Gold Standard 100% Whey',
    brand: 'Optimum Nutrition',
    category: 'Protein',
    description: 'The world\'s best-selling whey protein powder. 24g of protein per serving to help build and maintain muscle.',
    price: 74.99,
    compareAtPrice: 89.99,
    image: '/assets/Protien.jpg',
    rating: 4.9,
    reviewCount: 2341,
    badges: ['bestseller'],
    variants: [
      { size: '5lb', flavor: 'Double Rich Chocolate', price: 74.99, inStock: true },
      { size: '5lb', flavor: 'Vanilla Ice Cream', price: 74.99, inStock: true },
    ],
    benefits: ['24g Protein', '5.5g BCAAs', 'Gluten Free']
  },
  {
    id: 'p2',
    name: 'Mutant Mass Gainer',
    brand: 'Mutant',
    category: 'Muscle Building',
    description: 'Designed for the hardgainer. High calorie weight gainer with 56g of protein and 192g of clean carbs.',
    price: 64.99,
    image: '/assets/Protien.jpg',
    rating: 4.7,
    reviewCount: 856,
    badges: ['sale'],
    variants: [
      { size: '15lb', flavor: 'Triple Chocolate', price: 64.99, inStock: true },
    ],
    benefits: ['1100 Calories', '56g Protein', 'Whole Food Carbs']
  },
  {
    id: 'p3',
    name: 'C4 Original Pre-Workout',
    brand: 'Cellucor',
    category: 'Pre-Workout',
    description: 'Explosive energy, heightened focus and an overwhelming urge to tackle any challenge.',
    price: 39.99,
    image: '/assets/Protien.jpg',
    rating: 4.8,
    reviewCount: 5420,
    badges: ['bestseller'],
    variants: [
      { size: '30 Servings', flavor: 'Icy Blue Razz', price: 39.99, inStock: true },
      { size: '30 Servings', flavor: 'Fruit Punch', price: 39.99, inStock: true },
    ],
    benefits: ['150mg Caffeine', '1.6g Beta-Alanine', 'Creatine Nitrate']
  },
  {
    id: 'p4',
    name: 'Iso-Surge Isolate',
    brand: 'Mutant',
    category: 'Protein',
    description: 'High speed absorption to get protein into your muscle tissue FAST.',
    price: 49.99,
    image: '/assets/Protien.jpg',
    rating: 4.9,
    reviewCount: 120,
    badges: ['new'],
    variants: [
      { size: '1.6lb', flavor: 'Pineapple Coconut', price: 49.99, inStock: true },
    ],
    benefits: ['25g Isolate', 'Low Carb', 'Gourmet Taste']
  },
  {
    id: 'p5',
    name: 'Creatine Monohydrate',
    brand: 'Peak House',
    category: 'Essentials',
    description: 'Pure micronized creatine monohydrate for improved strength and power output.',
    price: 29.99,
    image: '/assets/Protien.jpg',
    rating: 5.0,
    reviewCount: 42,
    badges: [],
    variants: [
      { size: '400g', flavor: 'Unflavored', price: 29.99, inStock: true },
    ],
    benefits: ['Micronized', 'Lab Tested', 'Vegan']
  },
  {
    id: 'p6',
    name: 'Super Greens',
    brand: 'Peak House',
    category: 'Wellness',
    description: 'Comprehensive daily greens formula with probiotics and digestive enzymes.',
    price: 44.99,
    compareAtPrice: 54.99,
    image: '/assets/Protien.jpg',
    rating: 4.6,
    reviewCount: 89,
    badges: ['sale'],
    variants: [
      { size: '30 Servings', flavor: 'Berry Blast', price: 44.99, inStock: true },
    ],
    benefits: ['Immune Support', 'Detoxify', 'Natural Energy']
  },
];

export const CATEGORIES = [
  { id: 'muscle', name: 'Muscle Building', icon: 'dumbbell', color: 'from-orange-500 to-red-600' },
  { id: 'weight-loss', name: 'Weight Loss', icon: 'flame', color: 'from-teal-400 to-emerald-600' },
  { id: 'endurance', name: 'Endurance', icon: 'zap', color: 'from-blue-500 to-cyan-400' },
  { id: 'health', name: 'General Health', icon: 'heart', color: 'from-green-500 to-teal-600' },
];
