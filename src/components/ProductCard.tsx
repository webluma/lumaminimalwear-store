"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { addToCart, toggleFavorite, isFavorite } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Product Image - Clickable */}
      <Link
        href={`/product/${product.id}`}
        className="relative aspect-[3/4] overflow-hidden cursor-pointer block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              Novo
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
              Mais Vendido
            </span>
          )}
        </div>

        {/* Favorite Button - Always visible */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
            isFavorite(product.id)
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          title={
            isFavorite(product.id)
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"
          }
        >
          <Heart
            size={16}
            fill={isFavorite(product.id) ? "currentColor" : "none"}
          />
        </motion.button>

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: hoveredProduct === product.id ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: hoveredProduct === product.id ? 1 : 0,
              y: hoveredProduct === product.id ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            Ver Detalhes
          </motion.div>
        </motion.div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm sm:text-lg font-medium text-gray-900 flex-1 mr-2">{product.name}</h3>
          <span className="text-sm sm:text-lg font-semibold text-gray-900 flex-shrink-0">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className="text-yellow-400 fill-current"
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-500">(4.8)</span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button - Always Visible */}
      <div className="p-3 sm:p-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            handleQuickAdd(product);
          }}
          className="w-full bg-gray-900 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
          <span>ADICIONAR AO CARRINHO</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
