import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CarInfoPanel } from "@/components/CarInfoPanel";
import { CarViewer } from "@/components/CarViewer";
import { SalesTrendChart } from "@/components/SalesTrendChart";
import { CarCard } from "@/components/CarCard";
import { getCarById, getTopSellingCars } from "@/lib/carDataProvider";

export async function generateStaticParams() {
  const cars = await getTopSellingCars();
  return cars.map((car) => ({ id: car.id }));
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car) notFound();

  const cars = await getTopSellingCars();
  const related = cars.filter((item) => item.id !== car.id && (item.category === car.category || item.energyType === car.energyType)).slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
        <ArrowLeft size={17} />
        返回排行榜
      </Link>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_420px]">
        <CarViewer car={car} />
        <CarInfoPanel car={car} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <SalesTrendChart car={car} />
        <section className="glass rounded-[2rem] p-6">
          <p className="text-sm text-cyan-200">Share Poster</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">销量榜车型海报</h2>
          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/15 via-slate-900 to-violet-400/15 p-5">
            <p className="text-sm text-slate-400">AutoTop 3D</p>
            <p className="mt-8 text-5xl font-semibold text-white">#{car.rank}</p>
            <p className="mt-3 text-2xl font-semibold text-cyan-100">{car.fullName}</p>
            <p className="mt-10 text-sm leading-6 text-slate-300">{car.highlight}</p>
          </div>
        </section>
      </div>
      <section className="mt-10">
        <div className="mb-5">
          <p className="text-sm text-cyan-200">Related</p>
          <h2 className="text-3xl font-semibold text-white">相关推荐车型</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <CarCard key={item.id} car={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
