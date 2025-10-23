"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ArrowLeft, Check } from "lucide-react";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";

export default function CheckoutPage() {
  const { cart } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const subtotal = cart.total;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Removed form handling as we're using StripeCheckoutButton now

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar às compras
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">
              Finalizar Compra
            </h1>

            <div className="space-y-6">
              {/* Payment Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Pagamento Seguro com Stripe
                </h2>
                <p className="text-gray-600 mb-6">
                  Seus dados de pagamento são processados de forma segura pelo
                  Stripe. Você será redirecionado para uma página segura para
                  inserir os dados do cartão.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Cartões de Teste:
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • <strong>Sucesso:</strong> 4242 4242 4242 4242
                    </li>
                    <li>
                      • <strong>Falha:</strong> 4000 0000 0000 0002
                    </li>
                    <li>
                      • <strong>3D Secure:</strong> 4000 0025 0000 3155
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    Use qualquer data futura e CVC de 3 dígitos
                  </p>
                </div>
              </div>

              {/* Stripe Checkout Button */}
              <StripeCheckoutButton className="w-full py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800">
                Finalizar Pedido com Stripe
              </StripeCheckoutButton>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-8 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.items.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className="flex items-center space-x-4"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product.category} • Qty {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frete</span>
                <span className="text-gray-900">
                  {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impostos</span>
                <span className="text-gray-900">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check size={16} />
                <span>
                  Pagamento seguro processado pelo Stripe - PCI DSS compliant
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
