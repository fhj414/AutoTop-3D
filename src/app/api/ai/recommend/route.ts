import { NextResponse } from "next/server";
import { getTopSellingCars } from "@/lib/carDataProvider";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: string };
  const message = body.message ?? "";
  const preferEv = /新能源|纯电|电车|插混|增程/i.test(message);
  const family = /家庭|家用|孩子|空间|长途/i.test(message);

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
              "你是中文购车顾问。基于用户预算、城市、用途、是否新能源等需求，从给定车型清单中挑选 3 款，并给出一句理由 + 一句试驾建议。不要编造不在清单里的车型。"
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
        return NextResponse.json({ reply });
      }
    } else {
      const text = await completion.text().catch(() => "");
      return NextResponse.json({ reply: `OpenRouter 调用失败（${completion.status}）。${text ? `详情：${text.slice(0, 280)}` : ""}` }, { status: 502 });
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
    reply: `基于你输入的需求，我建议先看：${picks}。如果预算在 25 万左右且重视智能化，可以优先试驾 Model Y / SU7；如果更看重家庭舒适和长途补能，理想 L6 或问界 M7 更合适。`
  });
}
