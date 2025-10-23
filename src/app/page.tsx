import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import FeaturedSection from "../components/FeaturedSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedSection />
      <ProductGrid />
    </div>
  );
}
