import ItemsList from "@/components/pages/itemsList";
import Catigories from "@/components/sections/home/catigories";
import HeroSection from "@/components/sections/home/hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Catigories className="sm:flex" />
      <HeroSection />
      <ItemsList
        searchBy="category"
        searchValue="laptops"
        sectionName="Top Seller"
      />
      <ItemsList searchBy="all" searchValue="all" sectionName="Good offers" />
    </div>
  );
}
