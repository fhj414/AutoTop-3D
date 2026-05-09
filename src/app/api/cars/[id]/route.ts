import { NextResponse } from "next/server";
import { getCarById } from "@/lib/carDataProvider";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });
  return NextResponse.json({ data: car });
}
