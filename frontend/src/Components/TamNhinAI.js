// src/components/AiInsights.jsx
import React from "react";
import { aiInsights } from "../Data/MockData.js";

export default function AiInsights() {
    return (
        <section className="w-full px-6 pb-20 lg:px-10 xl:px-16">
            <div className="mb-10 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2170e4] text-white">
                    ✦
                </div>
                <h2 className="text-[30px] font-semibold">
                    Phân tích chuyên sâu (AI Insights)
                </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {aiInsights.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-lg border-t-4 border-[#2170e4] bg-white p-8 shadow-[0_4px_10px_rgba(0,0,0,0.04)]"
                    >
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="mt-4 text-sm leading-6 text-[#434655]">
                            {item.text}
                        </p>
                        <button className="mt-6 text-sm font-semibold text-[#2170e4] hover:underline">
                            {item.link} →
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}