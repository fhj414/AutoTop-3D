import { cars } from "@/data/cars";

type RemoteCarPatch = Partial<(typeof cars)[number]> & { id: string };

async function fetchRemoteWeeklyCars(): Promise<RemoteCarPatch[] | null> {
  const url = process.env.CAR_DATA_URL;
  if (!url) return null;

  const response = await fetch(url, {
    // Cache on the server and refresh weekly by default.
    next: { revalidate: 60 * 60 * 24 * 7 }
  });

  if (!response.ok) {
    throw new Error(`CAR_DATA_URL request failed: ${response.status}`);
  }

  const data = (await response.json()) as unknown;
  if (!data || typeof data !== "object") return null;

  // Supported shapes:
  // 1) Car[] directly
  // 2) { cars: Car[] }
  const maybeCars = Array.isArray(data) ? data : (data as { cars?: unknown }).cars;
  if (!Array.isArray(maybeCars)) return null;

  return maybeCars.filter((item): item is RemoteCarPatch => !!item && typeof item === "object" && "id" in item && typeof (item as any).id === "string");
}

export async function getTopSellingCars() {
  // 当前返回 mock 数据。后续可以替换为：
  // 1. 调用后端接口
  // 2. 读取 CMS
  // 3. 接入第三方 API
  // 4. 爬取公开榜单后清洗
  const remote = await fetchRemoteWeeklyCars().catch(() => null);
  if (!remote) return cars;

  const localById = new Map(cars.map((car) => [car.id, car]));
  const merged = remote
    .map((patch) => {
      const base = localById.get(patch.id);
      return base ? { ...base, ...patch } : (patch as (typeof cars)[number]);
    })
    .filter(Boolean)
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));

  // If remote list is incomplete, keep remaining local items.
  const mergedIds = new Set(merged.map((c) => c.id));
  const fallback = cars.filter((c) => !mergedIds.has(c.id));
  return [...merged, ...fallback].sort((a, b) => a.rank - b.rank);
}

export async function getCarById(id: string) {
  const allCars = await getTopSellingCars();
  return allCars.find((car) => car.id === id) ?? null;
}
