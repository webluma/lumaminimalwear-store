"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Product,
  CartItem,
  Cart,
  CartContextType,
  FavoriteItem,
} from "@/types";

// Função para calcular o total do carrinho
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

interface StoreContextType extends CartContextType {
  favorites: FavoriteItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("aura-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("aura-cart", JSON.stringify(cart));
  }, [cart]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("minimalwear-favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("minimalwear-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      // 1. Verifica se o produto já existe no carrinho
      const existingItem = prevCart.items.find(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        // 2a. Se existe, incrementa a quantidade
        newItems = prevCart.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 2b. Se não existe, adiciona novo item
        newItems = [...prevCart.items, { product, quantity }];
      }

      // 3. Recalcula o total
      const total = calculateTotal(newItems);
      return { items: newItems, total };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) => item.product.id !== productId
      );
      const total = calculateTotal(newItems);
      return { items: newItems, total };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const total = calculateTotal(newItems);
      return { items: newItems, total };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 });
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart.items]);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const addToFavorites = useCallback((product: Product) => {
    setFavorites((prevFavorites) => {
      const existingFavorite = prevFavorites.find(
        (item) => item.product.id === product.id
      );

      if (existingFavorite) {
        return prevFavorites;
      }

      const newFavorite: FavoriteItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        addedAt: new Date(),
      };

      return [...prevFavorites, newFavorite];
    });
  }, []);

  const removeFromFavorites = useCallback((id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  }, []);

  const toggleFavorite = useCallback(
    (product: Product) => {
      const existingFavorite = favorites.find(
        (item) => item.product.id === product.id
      );

      if (existingFavorite) {
        removeFromFavorites(existingFavorite.id);
      } else {
        addToFavorites(product);
      }
    },
    [favorites, addToFavorites, removeFromFavorites]
  );

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some((item) => item.product.id === productId);
    },
    [favorites]
  );

  const value: StoreContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    favorites,
    isCartOpen,
    toggleCart,
    closeCart,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
