"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Lock,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, toggleFavorite, isFavorite } = useStore();

  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Produto não encontrado
          </h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar aos produtos
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Novo
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Mais Vendido
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-200 ${
                      selectedImage === index
                        ? "ring-2 ring-gray-900 shadow-lg"
                        : "hover:shadow-md"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Product Title and Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Novo
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Mais Vendido
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-light text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (4.8) • 127 avaliações
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Material</span>
                <span className="text-gray-900">
                  {product.category === "Bolsas" ||
                  product.category === "Carteiras"
                    ? "Couro Premium"
                    : "Acetato Premium"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Cuidados</span>
                <span className="text-gray-900">
                  {product.category === "Óculos de Sol"
                    ? "Limpar com pano macio"
                    : "Limpar com pano seco"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Origem</span>
                <span className="text-gray-900">Feito no Brasil</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Garantia</span>
                <span className="text-gray-900">1 ano</span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Quantidade
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 rounded-l-lg transition-colors"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="px-4 text-lg font-medium">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 rounded-r-lg transition-colors"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800"
            >
              <ShoppingBag size={20} />
              Adicionar ao Carrinho
            </motion.button>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleFavorite}
              className={`w-full py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                isFavorite(product.id)
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Heart
                size={20}
                fill={isFavorite(product.id) ? "currentColor" : "none"}
              />
              {isFavorite(product.id)
                ? "Remover dos Favoritos"
                : "Adicionar aos Favoritos"}
            </motion.button>

            {/* Product Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Material</span>
                <span className="text-gray-900">
                  {product.category === "Bolsas" ||
                  product.category === "Carteiras"
                    ? "Couro Premium"
                    : "Acetato Premium"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cuidados</span>
                <span className="text-gray-900">
                  {product.category === "Óculos de Sol"
                    ? "Limpar com pano macio"
                    : "Limpar com pano seco"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Origem</span>
                <span className="text-gray-900">Feito no Brasil</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Garantia</span>
                <span className="text-gray-900">1 ano</span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock size={16} />
                <span>Compra 100% segura e protegida</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
