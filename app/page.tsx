import { CategoriesSection } from "@/components/home/categories-section";
import { HeroSection } from "@/components/home/hero-section";
import { PopularProductsSection } from "@/components/home/popular-products-section";
import { ProductSearch } from "@/components/home/product-search";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { TopBar } from "@/components/layout/top-bar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white pb-20 md:pb-0">
      <div className="sticky top-0 z-50">
        <TopBar />
        <Header />
      </div>

      <HeroSection />
      <ProductSearch />
      <CategoriesSection />
      <PopularProductsSection />

      <MobileBottomNav />
    </main>
  );
}