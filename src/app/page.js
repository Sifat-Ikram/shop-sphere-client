import Banner from "@/components/ui/banner/Banner";
import Categories from "@/components/ui/categories/Categories";
import HeroSection from "@/components/ui/heroSection/HeroSection";
import SpecialOffers from "@/components/ui/specialOffer/SpecialOffers";

export default function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <HeroSection />
      <SpecialOffers />
    </main>
  );
}
