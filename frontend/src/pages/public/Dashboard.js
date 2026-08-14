import HeroSection from "../../Components/HeroSection";
import Industries from "../../Components/CongTy";
import LatestJobs from "../../Components/ViecLamMoiNhat";
import MarketAnalysis from "../../Components/PhanTichThiTruong";
import Metrics from "../../Components/BieuDo";
import AiInsights from "../../Components/TamNhinAI";
import TopCompanies from "../../Components/CongTyHangdau";

export default function DashBoard() {
    return (
        <>
            <HeroSection />
            <Industries />
            <LatestJobs />
            <MarketAnalysis />
            <Metrics />
            <AiInsights />
            <TopCompanies />
        </>
    );
}