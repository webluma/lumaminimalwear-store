"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CarteirasPage() {
  const [sortBy, setSortBy] = useState("featured");

  // Filtrar apenas carteiras
  const carteiras = products.filter(
    (product) => product.category === "Carteiras"
  );

  const filteredProducts = carteiras.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "featured":
      default:
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
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
            Carteiras Elegantes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carteiras minimalistas em couro premium, perfeitas para organizar
            seus pertences com estilo.
          </p>
        </motion.div>

        {/* Filters */}
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
              <option value="featured">Destaques</option>
              <option value="newest">Mais Recentes</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            {filteredProducts.length} produto
            {filteredProducts.length !== 1 ? "s" : ""} encontrado
            {filteredProducts.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
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
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhuma carteira encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar seus filtros para ver mais resultados
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
