"use client";

import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  factors?: string[];
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "告诉我预算、城市、用途和是否考虑新能源，我会先用本地规则给你推荐。" }
  ]);

  async function submit() {
    if (thinking) return;
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setThinking(true);
    setMessages((items) => [...items, { role: "user", content: userMessage }, { role: "assistant", content: "思考中…" }]);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = (await response.json()) as { reply: string; factors?: string[] };
      const assistantMessage: Message = { role: "assistant", content: data.reply, factors: data.factors };
      setMessages((items) => {
        const copy = [...items];
        const lastAssistantIndex = copy.map((m) => m.role).lastIndexOf("assistant");
        if (lastAssistantIndex >= 0 && copy[lastAssistantIndex]?.content === "思考中…") {
          copy[lastAssistantIndex] = assistantMessage;
          return copy;
        }
        return [...copy, assistantMessage];
      });
    } catch {
      setMessages((items) => {
        const copy = [...items];
        const lastAssistantIndex = copy.map((m) => m.role).lastIndexOf("assistant");
        const errorMessage: Message = { role: "assistant", content: "刚刚请求失败了。请检查网络后重试，或稍后再试。" };
        if (lastAssistantIndex >= 0 && copy[lastAssistantIndex]?.content === "思考中…") {
          copy[lastAssistantIndex] = errorMessage;
          return copy;
        }
        return [...copy, errorMessage];
      });
    } finally {
      setThinking(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-200"
      >
        <Bot size={18} />
        问 AI 帮我选车
      </button>
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/95 shadow-glow backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300 text-slate-950">
                <Bot size={18} />
              </span>
              <div>
                <p className="font-semibold text-white">AI 购车助手</p>
                <p className="text-xs text-slate-400">给出推荐 + 思考摘要</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-slate-200 hover:bg-white/15">
              <X size={17} />
            </button>
          </div>
          <div className="max-h-96 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`rounded-2xl p-3 text-sm leading-6 ${message.role === "user" ? "ml-10 bg-cyan-300 text-slate-950" : "mr-10 bg-white/8 text-slate-100"}`}>
                {message.factors && message.factors.length > 0 && (
                  <details className="mb-2 rounded-xl border border-white/10 bg-slate-950/30 px-3 py-2">
                    <summary className="cursor-pointer select-none text-xs text-slate-300">思考摘要（点击展开）</summary>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                      {message.factors.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                )}
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void submit();
              }}
              disabled={thinking}
              placeholder="例如：25万，上海，家用，想买新能源"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              onClick={() => void submit()}
              disabled={thinking || !input.trim()}
              className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300 text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
