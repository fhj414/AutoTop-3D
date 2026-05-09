import { Boxes, Bot, Car, ChartLine, Cuboid, Radar } from "lucide-react";

const stack = ["Next.js", "TypeScript", "Tailwind CSS", "React Three Fiber", "Drei", "Three.js", "Zustand", "Recharts", "Framer Motion", "lucide-react"];
const roadmap = [
  { icon: ChartLine, text: "接入实时销量榜" },
  { icon: Cuboid, text: "接入真实 3D 模型" },
  { icon: Radar, text: "支持 AR 看车" },
  { icon: Boxes, text: "支持车型对比" },
  { icon: Bot, text: "支持 AI 购车助手" }
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="glass rounded-[2rem] p-8">
        <Car className="text-cyan-200" size={34} />
        <h1 className="mt-6 text-5xl font-semibold text-white">AutoTop 3D</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          一个面向年轻用户、汽车爱好者和购车人群的未来汽车展厅，用排行榜、3D 交互和趋势数据把选车体验做得更直观。
        </p>
      </section>
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-[2rem] p-6">
          <p className="text-sm text-cyan-200">Tech Stack</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">技术栈</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="glass rounded-[2rem] p-6">
          <p className="text-sm text-cyan-200">Roadmap</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">未来规划</h2>
          <div className="mt-6 grid gap-3">
            {roadmap.map((item) => (
              <div key={item.text} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300/10 text-cyan-200">
                  <item.icon size={18} />
                </span>
                <span className="text-slate-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
