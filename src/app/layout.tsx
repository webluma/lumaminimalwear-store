import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MinimalWear - Acessórios Femininos Minimalistas",
  description:
    "Descubra acessórios minimalistas elegantes. Bolsas, carteiras e óculos de sol atemporais para a mulher moderna.",
  keywords:
    "acessórios minimalistas, bolsas femininas, carteiras elegantes, óculos de sol, design limpo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <StoreProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartSidebar />
        </StoreProvider>
      </body>
    </html>
  );
}
