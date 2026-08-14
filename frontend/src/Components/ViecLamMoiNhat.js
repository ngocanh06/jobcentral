import React, { useState } from "react";
import { jobs } from "../Data/MockData.js";
import JobCard from "./JobCard";

const jobTabs = [
    "Tất cả",
    "Việc làm nổi bật",
    "Tuyển gấp",
    "Thực tập sinh",
];

export default function LatestJobs() {
    const [activeJobTab, setActiveJobTab] = useState("Tất cả");
    const [favoriteIds, setFavoriteIds] = useState(new Set([1]));

    const toggleFavorite = (id) => {
        setFavoriteIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const filteredJobs = jobs.filter((job) => {
        if (activeJobTab === "Tất cả") return true;
        if (activeJobTab === "Việc làm nổi bật") return job.id % 2 === 1;
        if (activeJobTab === "Tuyển gấp") return job.type === "Full-time";
        if (activeJobTab === "Thực tập sinh") return job.type === "Remote" || job.type === "Hybrid";
        return true;
    });

    return (
        <section className="w-full px-6 py-12 lg:px-10 xl:px-16">
            <div className="text-center">
                <h2 className="text-[30px] font-bold">
                    Việc Làm <span className="text-[#2170e4]">Mới Nhất</span>
                </h2>

                <div className="mx-auto mt-7 flex w-fit flex-wrap justify-center gap-1 rounded-2xl bg-[#eff4ff] p-1">
                    {jobTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveJobTab(tab)}
                            className={`rounded-xl px-6 py-3 text-sm font-medium transition ${activeJobTab === tab
                                ? "bg-[#2170e4] text-white shadow"
                                : "text-[#464555] hover:bg-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        company={job.company}
                        salary={job.salary}
                        location={job.location}
                        type={job.type}
                        isFavorite={favoriteIds.has(job.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </section>
    );
}