export interface JewelleryProduct {
  id: string;
  name: string;
  category: 'Ring' | 'Chain Pendant' | 'Earrings' | 'Bracelet' | 'Bangles' | 'Chain Earring Set';
  price: string;
  image: string;
  gallery: string[];
  description: string;
  badge?: string;
}

export interface CartItem {
  productId: string;
  productType: 'jewellery' | 'mixed';
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  gsm?: string;
  color?: string;
}

export const jewelleryProducts: JewelleryProduct[] = [
  {
    id: 'jw-001',
    name: 'Soleil Diamond Ring',
    category: 'Ring',
    price: '₹3,299',
    image: '/jewellery-images/2',
    gallery: ['/jewellery-images/2', '/jewellery-images/1', '/jewellery-images/5'],
    description: 'Brushed gold signet ring with a diamond-cut crystal centre. Power and prestige, refined.',
    badge: 'BESTSELLER',
  },
  {
    id: 'jw-002',
    name: 'Crescent Moon Ring',
    category: 'Ring',
    price: '₹2,199',
    image: '/jewellery-images/1',
    gallery: ['/jewellery-images/1', '/jewellery-images/5', '/jewellery-images/3'],
    description: 'Delicate crescent moon design in anti-tarnish gold finish. For the ethereal soul.',
    badge: 'NEW',
  },
  {
    id: 'jw-003',
    name: 'Cuban Link Chain Pendant',
    category: 'Chain Pendant',
    price: '₹4,999',
    image: '/jewellery-images/3',
    gallery: ['/jewellery-images/3', '/jewellery-images/4', '/jewellery-images/2'],
    description: 'Anti-tarnish gold-plated Cuban link chain with pendant. Heavy, bold, and undeniably luxurious.',
    badge: 'PREMIUM',
  },
  {
    id: 'jw-004',
    name: 'Serpent Chain Pendant',
    category: 'Chain Pendant',
    price: '₹3,799',
    image: '/jewellery-images/4',
    gallery: ['/jewellery-images/4', '/jewellery-images/1', '/jewellery-images/3'],
    description: 'Snake-link chain with pendant and subtle texture and brilliant luster. Subtle power.',
  },
  {
    id: 'jw-005',
    name: 'Soleil Diamond Studs',
    category: 'Earrings',
    price: '₹2,499',
    image: '/jewellery-images/1',
    gallery: ['/jewellery-images/1', '/jewellery-images/2', '/jewellery-images/5'],
    description: 'Timeless diamond-cut crystal studs in anti-tarnish gold-plated settings. Effortlessly elegant.',
    badge: 'BESTSELLER',
  },
  {
    id: 'jw-006',
    name: 'Aurum Hoop Earrings',
    category: 'Earrings',
    price: '₹1,899',
    image: '/jewellery-images/5',
    gallery: ['/jewellery-images/5', '/jewellery-images/1', '/jewellery-images/4'],
    description: 'Classic gold hoop earrings that never go out of style. Pure elegance.',
  },
  {
    id: 'jw-007',
    name: 'Lion King Bracelet',
    category: 'Bracelet',
    price: '₹2,799',
    image: '/jewellery-images/4',
    gallery: ['/jewellery-images/4', '/jewellery-images/5', '/jewellery-images/3'],
    description: 'Hand-crafted lion head charm on an elegant gold bracelet. Symbol of strength and luxury.',
    badge: 'LIMITED',
  },
  {
    id: 'jw-008',
    name: 'Aurum Link Bracelet',
    category: 'Bracelet',
    price: '₹2,199',
    image: '/jewellery-images/2',
    gallery: ['/jewellery-images/2', '/jewellery-images/4', '/jewellery-images/1'],
    description: 'Classic gold link bracelet with anti-tarnish coating. Timeless wrist wear.',
    badge: 'NEW',
  },
  {
    id: 'jw-009',
    name: 'Royal Gold Bangle',
    category: 'Bangles',
    price: '₹1,999',
    image: '/jewellery-images/3',
    gallery: ['/jewellery-images/3', '/jewellery-images/2', '/jewellery-images/5'],
    description: 'Classic gold-plated bangle with refined luxury detailing. Handcrafted elegance.',
    badge: 'SIGNATURE',
  },
  {
    id: 'jw-010',
    name: 'Empress Bangle Set',
    category: 'Bangles',
    price: '₹3,499',
    image: '/jewellery-images/1',
    gallery: ['/jewellery-images/1', '/jewellery-images/3', '/jewellery-images/2'],
    description: 'Set of 3 stacking bangles in graduated gold finish. A statement of feminine power.',
    badge: 'LIMITED',
  },
  {
    id: 'jw-011',
    name: 'Royal Chain Earring Set',
    category: 'Chain Earring Set',
    price: '₹3,999',
    image: '/jewellery-images/5',
    gallery: ['/jewellery-images/5', '/jewellery-images/3', '/jewellery-images/1'],
    description: 'Matching gold chain and drop earring set. A coordinated statement of luxury.',
    badge: 'BESTSELLER',
  },
  {
    id: 'jw-012',
    name: 'Celestial Chain Earring Set',
    category: 'Chain Earring Set',
    price: '₹4,299',
    image: '/jewellery-images/2',
    gallery: ['/jewellery-images/2', '/jewellery-images/5', '/jewellery-images/4'],
    description: 'Star-motif chain paired with celestial drop earrings. For the luxury lover.',
    badge: 'NEW',
  },
];
