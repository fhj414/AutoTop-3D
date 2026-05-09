import { Database, GitBranch, Network, ShieldCheck } from "lucide-react";

const providers = [
  { icon: Database, title: "当前数据", text: "默认使用 src/data/cars.ts 中的 Top10 mock 数据，不代表实时榜单。" },
  { icon: Network, title: "后端接口", text: "carDataProvider 已预留异步获取逻辑，可替换为自有 API 或数据中台。" },
  { icon: GitBranch, title: "第三方来源", text: "后续可接入汽车之家、懂车帝、乘联会等公开或授权数据源。" },
  { icon: ShieldCheck, title: "合规策略", text: "不在前端写死平台爬虫逻辑，统一通过 provider 清洗与缓存。" }
];

export default function DataSourcePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm text-cyan-200">Data Provider</p>
        <h1 className="mt-3 text-5xl font-semibold text-white">数据来源设计</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          当前站点使用演示数据，可接入实时销量源。数据获取统一封装在 carDataProvider 中，页面组件只消费标准化后的车型结构。
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {providers.map((item) => (
          <section key={item.title} className="glass rounded-[2rem] p-6">
            <item.icon className="text-cyan-200" size={28} />
            <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
          </section>
        ))}
      </div>
      <section className="glass mt-8 rounded-[2rem] p-6">
        <h2 className="text-2xl font-semibold text-white">Provider 接入约定</h2>
        <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm text-slate-300">
{`export async function getTopSellingCars() {
  // 1. 调用后端接口
  // 2. 读取 CMS
  // 3. 接入第三方 API
  // 4. 爬取公开榜单后清洗
}`}
        </pre>
      </section>
    </main>
  );
}
