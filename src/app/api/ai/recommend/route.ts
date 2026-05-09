import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: string };
  const message = body.message ?? "";
  const preferEv = /新能源|纯电|电车|插混|增程/i.test(message);
  const family = /家庭|家用|孩子|空间|长途/i.test(message);

  // 预留 OpenRouter 调用位置：
  // const apiKey = process.env.OPENROUTER_API_KEY;
  // const model = process.env.OPENROUTER_MODEL;
  // if (apiKey && model) { await fetch("https://openrouter.ai/api/v1/chat/completions", ...) }

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
