"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Minus, Plus, Lock, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/types";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, toggleFavorite, isFavorite } = useStore();

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedImage(0);
    }
  }, [product]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;
    // Add product to cart with quantity
    addToCart(product, quantity);
    onClose(); // Close modal after adding to cart
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    toggleFavorite(product);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="fixed inset-0 bg-white bg-opacity-20 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(8px)" }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-gray-100 mx-4"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Fechar modal"
              >
                <X size={20} />
              </motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Product Images */}
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.images[selectedImage] || product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {product.images.map((image, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                              selectedImage === index ? "ring-2 ring-white" : ""
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${product.name} thumbnail ${index + 1}`}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

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
                </div>

                {/* Product Details */}
                <div className="p-4 overflow-y-auto">
                  <div className="space-y-3">
                    {/* Product Title and Rating */}
                    <div>
                      <h1 className="text-lg font-light text-gray-900 mb-1">
                        {product.name}
                      </h1>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className="text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          (4.8) • 127 avaliações
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-base text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Quantity */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        Quantidade
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="p-1 hover:bg-gray-100 rounded-l transition-colors"
                          >
                            <Minus size={12} />
                          </motion.button>
                          <span className="px-2 text-sm font-medium">
                            {quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-r transition-colors"
                          >
                            <Plus size={12} />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center gap-2 text-xs bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                      >
                        <ShoppingBag size={14} />
                        Adicionar ao Carrinho
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleToggleFavorite}
                        className={`w-full py-2 px-3 rounded font-medium transition-colors flex items-center justify-center gap-2 text-xs ${
                          isFavorite(product.id)
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Heart
                          size={14}
                          fill={
                            isFavorite(product.id) ? "currentColor" : "none"
                          }
                        />
                        {isFavorite(product.id)
                          ? "Remover dos Favoritos"
                          : "Adicionar aos Favoritos"}
                      </motion.button>
                    </div>

                    {/* Product Info */}
                    <div className="border-t border-gray-200 pt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Material</span>
                        <span className="text-gray-900">
                          {product.category === "Bolsas" ||
                          product.category === "Carteiras"
                            ? "Couro Premium"
                            : "Acetato Premium"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Cuidados</span>
                        <span className="text-gray-900">
                          {product.category === "Óculos de Sol"
                            ? "Limpar com pano macio"
                            : "Limpar com pano seco"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Origem</span>
                        <span className="text-gray-900">Feito no Brasil</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Garantia</span>
                        <span className="text-gray-900">1 ano</span>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-gray-50 rounded p-2">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Lock size={12} />
                        <span>Compra 100% segura e protegida</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
