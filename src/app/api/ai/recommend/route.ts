import { NextResponse } from "next/server";
import { getTopSellingCars } from "@/lib/carDataProvider";

function extractFactors(message: string) {
  const factors: string[] = [];
  const budgetMatch = message.match(/(\d+(?:\.\d+)?)\s*万/);
  if (budgetMatch?.[1]) factors.push(`预算约 ${budgetMatch[1]} 万`);
  if (/一二线|北上广深|上海|北京|广州|深圳|杭州|成都|重庆|武汉|西安|南京|苏州|天津/i.test(message)) factors.push("考虑城市通勤/限牌/补能便利性");
  if (/家庭|家用|孩子|空间|长途/i.test(message)) factors.push("偏家庭用车：空间与舒适优先");
  if (/通勤|上班|代步/i.test(message)) factors.push("偏通勤代步：能耗/可靠性优先");
  if (/性能|加速|操控|运动/i.test(message)) factors.push("偏性能操控：动力与底盘优先");
  if (/新能源|纯电|电车|插混|增程/i.test(message)) factors.push("倾向新能源：补能方式与续航优先");
  if (/油车|燃油/i.test(message)) factors.push("倾向燃油：维护成本与保值优先");
  if (factors.length === 0) factors.push("信息不足：先按热门车型 + 用途倾向推荐");
  return factors;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: string };
  const message = body.message ?? "";
  const preferEv = /新能源|纯电|电车|插混|增程/i.test(message);
  const family = /家庭|家用|孩子|空间|长途/i.test(message);
  const factors = extractFactors(message);

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

  if (apiKey) {
    const cars = await getTopSellingCars();
    const shortlist = cars.slice(0, 10).map((car) => ({
      id: car.id,
      name: car.fullName,
      priceRange: car.priceRange,
      monthlySales: car.monthlySales,
      energyType: car.energyType,
      category: car.category
    }));

    const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Recommended by OpenRouter for attribution/analytics; safe defaults.
        "HTTP-Referer": "https://autotop-3d.vercel.app",
        "X-Title": "AutoTop 3D"
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "你是中文购车顾问。基于用户预算、城市、用途、是否新能源等需求，从给定车型清单中挑选 3 款。输出需包含：1) “思考摘要”：用 3-6 条要点列出你用到的关键考虑因素（不要输出逐步推理过程）；2) “推荐”：3 款车+一句理由；3) “下一步”：一句试驾建议。不要编造不在清单里的车型。"
          },
          {
            role: "user",
            content: `用户需求：${message}\n\n可选车型清单(JSON)：${JSON.stringify(shortlist)}`
          }
        ]
      })
    });

    if (completion.ok) {
      const data = (await completion.json()) as any;
      const reply: string | undefined = data?.choices?.[0]?.message?.content;
      if (reply && typeof reply === "string") {
        return NextResponse.json({ reply, factors });
      }
    } else {
      const text = await completion.text().catch(() => "");
      return NextResponse.json(
        { reply: `OpenRouter 调用失败（${completion.status}）。${text ? `详情：${text.slice(0, 280)}` : ""}`, factors },
        { status: 502 }
      );
    }
  }

  const picks = preferEv
    ? family
      ? "理想 L6、问界 M7、特斯拉 Model Y"
      : "小米 SU7、特斯拉 Model Y、比亚迪海鸥"
    : family
      ? "大众朗逸、日产轩逸、丰田锋兰达"
      : "大众朗逸、比亚迪秦 PLUS、日产轩逸";

  return NextResponse.json({
    factors,
    reply: `推荐：${picks}。\n下一步：把你的预算上限、主要用车城市（是否限牌）、日常通勤里程、是否能装家充补全，我可以把 3 台车的配置/版本也一起对比给你。`
  });
}
