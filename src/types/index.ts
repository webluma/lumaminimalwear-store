export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  inStock?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  stripeProductId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export interface FavoriteItem {
  id: string;
  product: Product;
  addedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: FavoriteItem[];
}

