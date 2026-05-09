import { AIAssistant } from "@/components/AIAssistant";
import { CarRankList } from "@/components/CarRankList";
import { Hero } from "@/components/Hero";
import { getTopSellingCars } from "@/lib/carDataProvider";

export default async function HomePage() {
  const cars = await getTopSellingCars();

  return (
    <main>
      <Hero />
      <CarRankList cars={cars} />
      <AIAssistant />
    </main>
  );
}
