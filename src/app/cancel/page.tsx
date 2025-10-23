"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Pagamento Cancelado
          </h1>
          <p className="text-gray-600 mb-6">
            Seu pagamento foi cancelado. Nenhuma cobrança foi realizada.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/checkout"
            className="block w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-200 font-light"
          >
            Tentar Novamente
          </Link>
          <Link
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors duration-200 font-light"
          >
            Voltar ao Início
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Se você teve algum problema durante o pagamento, entre em contato
            conosco.
          </p>
        </div>
      </div>
    </div>
  );
}

