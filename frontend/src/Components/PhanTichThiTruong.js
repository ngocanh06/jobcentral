// src/components/MarketAnalysis.jsx
import React from "react";
import { marketData } from "../Data/MockData.js";

const chartHeights = [35, 48, 62, 54, 72, 82, 70, 88, 75, 92, 100];

export default function MarketAnalysis() {
    return (
        <section className="w-full px-6 py-16 lg:px-10 xl:px-16">
            <h2 className="text-center text-[30px] font-bold">
                Cập Nhật Thị Trường Lao Động{" "}
                <span className="text-[#2170e4]">Mỗi Ngày</span>
            </h2>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg bg-white p-8 shadow-[0_4px_10px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Xu hướng đăng tuyển</h3>
                        <select className="rounded-lg bg-[#f3f3f6] px-4 py-2 text-sm outline-none">
                            <option>6 tháng qua</option>
                            <option>12 tháng qua</option>
                        </select>
                    </div>

                    <div className="mt-10 flex h-[300px] items-end gap-3 border-b border-gray-200 px-2">
                        {chartHeights.map((height, index) => (
                            <div
                                key={index}
                                className="flex-1 rounded-t bg-[#2170e4]"
                                style={{
                                    height: `${height}%`,
                                    opacity: 0.15 + index * 0.07,
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-3 flex justify-between text-xs text-[#434655]">
                        <span>Th. 6</span>
                        <span>Th. 9</span>
                        <span>Th. 12</span>
                        <span>Th. 3</span>
                        <span>Th. 5</span>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-8 shadow-[0_4px_10px_rgba(0,0,0,0.04)]">
                    <h3 className="text-xl font-semibold">Ngành nghề nhu cầu cao</h3>

                    <div className="mt-8 space-y-6">
                        {marketData.map((item) => (
                            <div key={item.name}>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="font-semibold">{item.name}</span>
                                    <span className="font-bold">{item.value}%</span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-[#f3f3f6]">
                                    <div
                                        className="h-full rounded-full bg-[#2170e4]"
                                        style={{ width: `${item.value * 2.1}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}