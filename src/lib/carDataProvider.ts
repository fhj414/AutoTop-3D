import { cars } from "@/data/cars";

export async function getTopSellingCars() {
  // 当前返回 mock 数据。后续可以替换为：
  // 1. 调用后端接口
  // 2. 读取 CMS
  // 3. 接入第三方 API
  // 4. 爬取公开榜单后清洗
  return cars;
}

export async function getCarById(id: string) {
  const allCars = await getTopSellingCars();
  return allCars.find((car) => car.id === id) ?? null;
}
