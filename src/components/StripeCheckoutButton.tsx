"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";

interface StripeCheckoutButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function StripeCheckoutButton({
  className = "",
  children,
}: StripeCheckoutButtonProps) {
  const { cart } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      alert("Seu carrinho está vazio");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        items: cart.items,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel`,
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      if (session.url) {
        // Redirect to Stripe-hosted checkout page
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Erro ao processar o pagamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || cart.items.length === 0}
      className={`${className} ${
        isLoading || cart.items.length === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      } transition-opacity duration-200`}
    >
      {isLoading ? "Processando..." : children}
    </button>
  );
}
