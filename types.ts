export type ViewState = 'home' | 'shop' | 'product' | 'gym' | 'cart';

export interface ProductVariant {
  size: string;
  flavor: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badges: ('new' | 'bestseller' | 'sale')[];
  variants: ProductVariant[];
  benefits: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant: ProductVariant;
}

export interface FilterState {
  category: string[];
  priceRange: [number, number];
  brand: string[];
}

export interface AppContextType {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, qty: number) => void;
  removeFromCart: (productId: string, variantIndex: number) => void;
  updateCartQty: (productId: string, variantIndex: number, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
}
