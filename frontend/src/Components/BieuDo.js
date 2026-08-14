// src/components/Metrics.jsx
import React from "react";
import { metrics } from "../Data/MockData.js";

export default function Metrics() {
    return (
        <section className="w-full px-6 pb-16 lg:px-10 xl:px-16">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div
                        key={metric.name}
                        className="rounded-lg bg-white p-6 shadow-[0_4px_10px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dbe1ff] text-[#2170e4]">
                                {metric.icon}
                            </div>

                            <span
                                className={`text-xs font-medium ${metric.positive ? "text-[#16a34a]" : "text-[#ba1a1a]"
                                    }`}
                            >
                                {metric.change}
                            </span>
                        </div>

                        <p className="mt-5 text-sm font-semibold text-[#434655]">
                            {metric.name}
                        </p>

                        <p className="mt-1 text-[30px] font-semibold tracking-tight">
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}