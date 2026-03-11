export interface JewelleryProduct {
  id: string;
  name: string;
  category: 'Ring' | 'Bracelet' | 'Earring' | 'Wrestlet' | 'Chain';
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
    name: 'Soleil Diamond Studs',
    category: 'Earring',
    price: '₹2,499',
    image: '/jewellery-images/1',
    gallery: ['/jewellery-images/1', '/jewellery-images/2', '/jewellery-images/5'],
    description: 'Timeless diamond-cut crystal studs in anti-tarnish gold-plated settings. Effortlessly elegant.',
    badge: 'BESTSELLER',
  },
  {
    id: 'jw-002',
    name: 'Monarch Signet Ring',
    category: 'Ring',
    price: '₹3,299',
    image: '/jewellery-images/2',
    gallery: ['/jewellery-images/2', '/jewellery-images/3', '/jewellery-images/1'],
    description: 'Brushed gold signet ring for the discerning individual. Power and prestige, refined.',
    badge: 'SIGNATURE',
  },
  {
    id: 'jw-003',
    name: 'Cuban Link Chain',
    category: 'Chain',
    price: '₹4,999',
    image: '/jewellery-images/3',
    gallery: ['/jewellery-images/3', '/jewellery-images/4', '/jewellery-images/2'],
    description: 'Anti-tarnish gold-plated Cuban link chain. Heavy, bold, and undeniably luxurious.',
    badge: 'PREMIUM',
  },
  {
    id: 'jw-004',
    name: 'Lion King Bracelet',
    category: 'Bracelet',
    price: '₹2,799',
    image: '/jewellery-images/4',
    gallery: ['/jewellery-images/4', '/jewellery-images/5', '/jewellery-images/3'],
    description: 'Hand-crafted lion head charm on an elegant gold bracelet. Symbol of strength and luxury.',
    badge: 'LIMITED',
  },
  {
    id: 'jw-005',
    name: 'Aurum Hoop Earrings',
    category: 'Earring',
    price: '₹1,899',
    image: '/jewellery-images/5',
    gallery: ['/jewellery-images/5', '/jewellery-images/1', '/jewellery-images/4'],
    description: 'Classic gold hoop earrings that never go out of style. Pure elegance.',
  },
  {
    id: 'jw-006',
    name: 'Crescent Moon Ring',
    category: 'Ring',
    price: '₹2,199',
    image: '/jewellery-images/2',
    gallery: ['/jewellery-images/2', '/jewellery-images/5', '/jewellery-images/3'],
    description: 'Delicate crescent moon design in anti-tarnish gold finish. For the ethereal soul.',
    badge: 'NEW',
  },
  {
    id: 'jw-007',
    name: 'Serpent Chain',
    category: 'Chain',
    price: '₹3,799',
    image: '/jewellery-images/3',
    gallery: ['/jewellery-images/3', '/jewellery-images/1', '/jewellery-images/4'],
    description: 'Snake-link chain with subtle texture and brilliant luster. Subtle power.',
  },
  {
    id: 'jw-008',
    name: 'Gold Plated Wrestlet',
    category: 'Wrestlet',
    price: '₹1,999',
    image: '/jewellery-images/4',
    gallery: ['/jewellery-images/4', '/jewellery-images/2', '/jewellery-images/5'],
    description: 'Classic gold-plated wrestlet with refined luxury detailing. Handcrafted elegance.',
  },
];
