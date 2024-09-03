import Banner from "@/components/ui/banner/Banner";
import BrandStory from "@/components/ui/brandStory/BrandStory";
import Categories from "@/components/ui/categories/Categories";
import HeroSection from "@/components/ui/heroSection/HeroSection";
import NewArrivals from "@/components/ui/newArrival/NewArrivals";
import ReviewPage from "@/components/ui/review/ReviewPage";
import SpecialOffers from "@/components/ui/specialOffer/SpecialOffers";
import TrendingItems from "@/components/ui/trendingItems/TrendingItems";

export default function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <TrendingItems />
      <NewArrivals />
      <HeroSection />
      <SpecialOffers />
      <BrandStory />
      <ReviewPage />
    </main>
  );
}
