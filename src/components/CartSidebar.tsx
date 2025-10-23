"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import StripeCheckoutButton from "./StripeCheckoutButton";

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
  } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Carrinho ({getTotalItems()})
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Adicione alguns itens para começar
                  </p>
                  <Link
                    href="/"
                    onClick={closeCart}
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Continuar Comprando
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="(max-width: 640px) 48px, 64px"
                          className="object-cover rounded"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item.product.category}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(0, item.quantity - 1)
                              )
                            }
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="w-6 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {formatPrice(cart.total)}
                  </span>
                </div>

                <div className="space-y-2">
                  <StripeCheckoutButton className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-center block font-medium text-sm sm:text-base">
                    Finalizar Compra
                  </StripeCheckoutButton>
                  <Link
                    href="/"
                    onClick={closeCart}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center block font-medium text-sm sm:text-base"
                  >
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
