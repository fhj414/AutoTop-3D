import { NextResponse } from "next/server";
import { getTopSellingCars } from "@/lib/carDataProvider";

export async function GET() {
  const cars = await getTopSellingCars();
  return NextResponse.json({ data: cars });
}
