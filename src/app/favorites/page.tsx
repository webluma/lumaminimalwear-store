"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
  const [sortBy, setSortBy] = useState("newest");
  const { favorites } = useStore();

  // Get favorite products
  const favoriteProducts = favorites.map((fav) => fav.product);

  const filteredProducts = favoriteProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
      default:
        return (
          new Date(b.isNew ? Date.now() : 0).getTime() -
          new Date(a.isNew ? Date.now() : 0).getTime()
        );
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Meus Favoritos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {favoriteProducts.length > 0
              ? `Você tem ${favoriteProducts.length} item${
                  favoriteProducts.length !== 1 ? "s" : ""
                } favoritado${favoriteProducts.length !== 1 ? "s" : ""}`
              : "Nenhum item favoritado ainda"}
          </p>
        </motion.div>

        {/* Filters - Only show if there are favorites */}
        {favoriteProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Ordenar por:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="newest">Mais Recentes</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredProducts.length} item
              {filteredProducts.length !== 1 ? "s" : ""} favoritado
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
          </motion.div>
        )}

        {/* Products Grid or Empty State */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhum favorito ainda
              </h3>
              <p className="text-gray-600 mb-6">
                Comece a favoritar produtos clicando no coração nos cards dos
                produtos
              </p>
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Explorar Produtos
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
