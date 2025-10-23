"use client";

import { useEffect, useState, Suspense } from "react";
import { useStore } from "@/context/StoreContext";
import Link from "next/link";
import { Check, Package, Truck, Mail, Clock, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}

function SuccessPageContent() {
  const { clearCart } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState("");

  // Gerar número de pedido aleatório
  useEffect(() => {
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      return `LUMA-${timestamp}-${random}`;
    };

    setOrderNumber(generateOrderNumber());
  }, []);

  useEffect(() => {
    // 🚨 AQUI É ONDE O CARRINHO É ZERADO!
    clearCart();
    console.log("Carrinho limpo após compra aprovada");
    setIsLoading(false);
  }, [clearCart]); // Executa apenas uma vez quando a página carrega

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Processando sua compra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da página */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Pagamento Aprovado!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Obrigado pela sua compra na MinimalWear
          </p>
          <p className="text-lg font-medium text-gray-800">
            Número do Pedido:{" "}
            <span className="text-gray-900 font-semibold">{orderNumber}</span>
          </p>
        </div>

        {/* Informações do pedido */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Próximas Etapas
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Confirmação por email */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirmação por Email
              </h3>
              <p className="text-gray-600 text-sm">
                Você receberá um email de confirmação em até 5 minutos com todos
                os detalhes do seu pedido e informações de rastreamento.
              </p>
            </div>

            {/* Preparação do pedido */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Preparação
              </h3>
              <p className="text-gray-600 text-sm">
                Seu pedido será preparado com cuidado em até 2 dias úteis. Todos
                os produtos passam por rigoroso controle de qualidade.
              </p>
            </div>

            {/* Envio */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Envio
              </h3>
              <p className="text-gray-600 text-sm">
                O prazo de entrega é de 3 a 7 dias úteis. Você receberá o código
                de rastreamento assim que o pedido for despachado.
              </p>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Informações Importantes
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-600" />
                Tempo de Processamento
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Pedidos processados em até 24 horas</li>
                <li>• Preparação em até 2 dias úteis</li>
                <li>• Envio em até 3 dias úteis</li>
                <li>• Entrega em 3 a 7 dias úteis</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Check className="w-5 h-5 mr-2 text-gray-600" />
                Garantias
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Produtos autênticos e originais</li>
                <li>• Garantia de 30 dias contra defeitos</li>
                <li>• Troca e devolução gratuitas</li>
                <li>• Atendimento especializado</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Continuar Comprando
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Ver Todos os Produtos
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Dúvidas? Entre em contato conosco através do email:
            contato@minimalwear.com
          </p>
        </div>
      </div>
    </div>
  );
}
