import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Banner from "@/components/ui/banner/Banner";
import BrandStory from "@/components/ui/brandStory/BrandStory";
import Categories from "@/components/ui/categories/Categories";
import FreeShipping from "@/components/ui/freeShipping/FreeShipping";
import HeroSection from "@/components/ui/heroSection/HeroSection";
import NewArrivals from "@/components/ui/newArrival/NewArrivals";
import PopUpModal from "@/components/ui/popUpModal/PopUpModal";
import ReviewPage from "@/components/ui/review/ReviewPage";
import SpecialOffers from "@/components/ui/specialOffer/SpecialOffers";
import TrendingItems from "@/components/ui/trendingItems/TrendingItems";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        <Banner />
        <Categories />
        <FreeShipping />
        <PopUpModal />
        <TrendingItems />
        <NewArrivals />
        <HeroSection />
        <SpecialOffers />
        <BrandStory />
        <ReviewPage />
      </main>
      <Footer />
    </div>
  );
}
