import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  Globe,
  Share2,
  AtSign,
  Check,
  Bookmark,
  Heart,
  X,
  Clock,
  User,
  Calendar,
  Sparkles,
  TrendingUp,
  Mail,
  ChevronRight,
} from 'lucide-react';
import featuredCareerImg from '../assets/images/featured_career_report_1791542153769.jpg';
import remoteHybridImg from '../assets/images/remote_hybrid_work_1791542166753.jpg';
import leadershipMeetingImg from '../assets/images/leadership_ai_meeting_1791542180672.jpg';
import salaryNegotiationImg from '../assets/images/salary_negotiation_success_1791542193113.jpg';
import careerGrowthImg from '../assets/images/career_growth_steps_1791542204381.jpg';

export const NewsView = ({ articles: propArticles = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [likedArticleIds, setLikedArticleIds] = useState(new Set());
  const [savedArticleIds, setSavedArticleIds] = useState(new Set());
  const [sidebarEmail, setSidebarEmail] = useState('');
  const [bottomEmail, setBottomEmail] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Category filter tabs matching the design
  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'job-tips', label: 'Bí quyết tìm việc' },
    { id: 'market-trends', label: 'Xu hướng nghề nghiệp' },
    { id: 'self-dev', label: 'Phát triển bản thân' },
    { id: 'expert-corner', label: 'Góc chuyên gia' },
  ];

  // Pre-configured rich articles with exact images and details from screenshot
  const allArticles = useMemo(() => {
    return [
      {
        id: 'art-featured-1',
        isFeatured: true,
        badge: 'NỔI BẬT',
        title: 'Báo cáo Thị trường Tuyển dụng 2024: Những kỹ năng "vàng" được săn đón',
        summary:
          'Khám phá các xu hướng mới nhất về lương bổng và những kỹ năng công nghệ đang thay đổi diện mạo thị trường lao động toàn cầu.',
        content: `Báo cáo toàn cảnh thị trường lao động 2024 từ JobCentral cho thấy sự bùng nổ của trí tuệ nhân tạo tạo sinh (GenAI), điện toán đám mây và an ninh mạng đang tái định hình yêu cầu tuyển dụng trên diện rộng.

Hơn 72% nhà tuyển dụng cho biết họ ưu tiên ứng viên sở hữu khả năng kết hợp giữa kỹ năng chuyên môn sâu (Hard skills) và tư duy ứng dụng công nghệ tự động hóa. Mức lương cho các vị trí liên quan đến AI và dữ liệu lớn tiếp tục duy trì mức tăng trưởng ấn tượng từ 18% đến 25% so với cùng kỳ năm trước.

Các điểm nổi bật trong báo cáo:
• 1. Tự động hóa quy trình: 65% doanh nghiệp đang tích hợp công cụ AI vào nghiệp vụ văn phòng hàng ngày.
• 2. Kỹ năng mềm lên ngôi: Kỹ năng thích ứng (Adaptability), tư duy phản biện (Critical Thinking) và giải quyết vấn đề phức tạp được săn đón nhiều nhất.
• 3. Chính sách đãi ngộ linh hoạt: Chế độ làm việc Hybrid và ngân sách chăm sóc sức khỏe toàn diện trở thành yếu tố quyết định để giữ chân nhân tài.`,
        category: 'Xu hướng nghề nghiệp',
        categoryKey: 'market-trends',
        readTime: '8 phút đọc',
        author: 'Ban Biên Tập JobCentral',
        authorRole: 'Nhóm Nghiên Cứu Thị Trường',
        date: '15 Tháng 10, 2023',
        imageUrl: featuredCareerImg,
      },
      {
        id: 'art-top-1',
        isTopRight: true,
        title: '5 Cách để Xây dựng Thương hiệu Cá nhân trên LinkedIn',
        summary:
          'Làm thế nào để hồ sơ của bạn nổi bật giữa hàng triệu ứng viên khác chỉ với vài thay đổi nhỏ...',
        content: `LinkedIn không chỉ là một chiếc CV trực tuyến mà còn là nền tảng kết nối quyền lực nhất dành cho chuyên gia toàn cầu. Để tối ưu hóa profile cá nhân và thu hút nhà tuyển dụng:

1. Đặt tiêu đề (Headline) chiến lược: Nhấn mạnh giá trị cốt lõi bạn đem lại cho doanh nghiệp thay vì chỉ ghi chức danh chung chung.
2. Tối ưu ảnh đại diện chuyên nghiệp và banner cá nhân hóa thể hiện phong cách làm việc.
3. Chia sẻ các bài học kinh nghiệm, case study thực chiến tối thiểu 2 lần/tuần để xây dựng uy tín chuyên môn.
4. Chủ động tham gia tương tác, bình luận có giá trị trong các bài đăng của các chuyên gia đầu ngành.
5. Tận dụng mục Featured để đính kèm các dự án tiêu biểu, chứng chỉ và bài viết được quan tâm cao nhất.`,
        category: 'Phát triển bản thân',
        categoryKey: 'self-dev',
        readTime: '5 phút đọc',
        author: 'Hương Giang',
        authorRole: 'Chuyên viên Tư vấn Thương hiệu',
        date: '14 Tháng 10, 2023',
        imageUrl: featuredCareerImg,
      },
      {
        id: 'art-top-2',
        isTopRight: true,
        title: 'Mẫu CV Chuyên nghiệp dành cho Ngành Công nghệ',
        summary:
          'Tải ngay bộ mẫu CV chuẩn ATS giúp bạn vượt qua vòng sàng lọc của những công ty công nghệ',
        content: `Hệ thống theo dõi hồ sơ ứng viên (ATS) hiện được hơn 85% các tập đoàn công nghệ lớn áp dụng. Một bản CV công nghệ chuẩn cần đảm bảo các yếu tố sau:

• Định dạng 1 cột rõ ràng, phông chữ tiêu chuẩn (Inter, Roboto hoặc Arial) để máy quét nhận diện chính xác 100%.
• Tích hợp từ khóa kỹ thuật tương ứng chính xác với bản mô tả công việc (Job Description).
• Trình bày thành tựu theo mô hình STAR (Situation - Task - Action - Result) cùng số liệu định lượng cụ thể (ví dụ: tối ưu tốc độ tải trang 40%, tăng tỷ lệ chuyển đổi 15%).
• Đính kèm đường dẫn GitHub, Behance hoặc Portfolio trực tuyến đã được chọn lọc kỹ lưỡng.`,
        category: 'Bí quyết tìm việc',
        categoryKey: 'job-tips',
        readTime: '4 phút đọc',
        author: 'Nguyễn Minh Anh',
        authorRole: 'Chuyên gia Tuyển dụng Tech',
        date: '13 Tháng 10, 2023',
        imageUrl: remoteHybridImg,
      },
      {
        id: 'art-latest-1',
        title: 'Làm việc từ xa vs. Hybrid: Đâu là lựa chọn tối ưu?',
        summary:
          'Phân tích sâu về ưu và nhược điểm của các mô hình làm việc hiện đại dựa trên khảo sát từ 5.000 nhân sự tại Việt Nam.',
        content: `Khảo sát diện rộng với hơn 5.000 nhân sự ngành công nghệ và tài chính tại Việt Nam cho thấy mô hình Hybrid (2-3 ngày tại văn phòng) đang chiếm ưu thế vượt trội với 68% người tham gia bình chọn là hình thức lý tưởng nhất.

Làm việc từ xa hoàn toàn (Full-remote) mang lại sự tự do cao và tiết kiệm thời gian di chuyển, nhưng đòi hỏi tính kỷ luật cao và đôi khi đối mặt với thách thức gắn kết văn hóa doanh nghiệp. Trong khi đó, mô hình Hybrid cân bằng hoàn hảo giữa hiệu suất tập trung cá nhân và sự hợp tác trực tiếp tại văn phòng.

Lựa chọn mô hình nào phụ thuộc lớn vào giai đoạn phát triển sự nghiệp của bạn và văn hóa làm việc của tổ chức.`,
        category: 'Xu hướng nghề nghiệp',
        categoryKey: 'market-trends',
        categoryDisplay: 'XU HƯỚNG',
        readTime: '6 phút đọc',
        author: 'Minh Anh',
        authorRole: 'HR Strategy Specialist',
        date: '12 Tháng 10, 2023',
        imageUrl: remoteHybridImg,
      },
      {
        id: 'art-latest-2',
        title: 'Kỹ năng lãnh đạo trong kỷ nguyên AI',
        summary:
          'Làm thế nào để các nhà quản lý thích nghi và dẫn dắt đội ngũ khi trí tuệ nhân tạo đang thay đổi quy trình làm việc hàng ngày.',
        content: `Thời đại AI đòi hỏi các nhà lãnh đạo phải chuyển đổi từ tư duy giám sát công việc sang tư duy trao quyền và định hướng chiến lược.

Người lãnh đạo thành công trong kỷ nguyên số không cần phải là người viết thuật toán AI giỏi nhất, mà là người biết cách đặt ra các bài toán đúng, thúc đẩy văn hóa thử nghiệm, khuyến khích nhân viên áp dụng AI vào tự động hóa công việc lặp lại và luôn duy trì đạo đức trong việc sử dụng công nghệ.

Trao quyền, xây dựng niềm tin và liên tục nâng cao năng lực cho đội ngũ là chìa khóa để tổ chức dẫn đầu trong làn sóng số hóa.`,
        category: 'Góc chuyên gia',
        categoryKey: 'expert-corner',
        categoryDisplay: 'GÓC CHUYÊN GIA',
        readTime: '7 phút đọc',
        author: 'Quốc Bảo',
        authorRole: 'Tech Director & Mentor',
        date: '10 Tháng 10, 2023',
        imageUrl: leadershipMeetingImg,
      },
      {
        id: 'art-latest-3',
        title: 'Vượt qua nỗi sợ khi đàm phán lương',
        summary:
          'Các bước chuẩn bị tâm lý và dữ liệu để bạn tự tin yêu cầu mức thu nhập xứng đáng với năng lực của mình.',
        content: `Nhiều ứng viên bỏ lỡ cơ hội tăng 15-30% thu nhập chỉ vì e ngại đàm phán lương trong vòng phỏng vấn cuối. Bí quyết nằm ở sự chuẩn bị chu đáo:

1. Thu thập dữ liệu: Tham khảo báo cáo lương thị trường từ JobCentral để biết khoảng thu nhập chuẩn cho vị trí và số năm kinh nghiệm của bạn.
2. Chuẩn bị danh mục thành tích: Liệt kê các dự án bạn đã tạo ra doanh thu hoặc tiết kiệm chi phí cụ thể cho công ty cũ.
3. Giữ tâm thế tự tin: Đàm phán lương là cuộc đối thoại đôi bên cùng có lợi (Win-Win), không phải là sự đòi hỏi một chiều.
4. Xem xét tổng gói đãi ngộ: Ngoài lương cứng, hãy cân nhắc thưởng hiệu suất, cổ phiếu ESOP, bảo hiểm sức khỏe và số ngày phép năm.`,
        category: 'Bí quyết tìm việc',
        categoryKey: 'job-tips',
        categoryDisplay: 'BÍ QUYẾT',
        readTime: '5 phút đọc',
        author: 'Thùy Dương',
        authorRole: 'Career Coach',
        date: '08 Tháng 10, 2023',
        imageUrl: salaryNegotiationImg,
      },
      {
        id: 'art-latest-4',
        title: 'Chuyển ngành ở tuổi 30: Không bao giờ là muộn',
        summary:
          'Câu chuyện cảm hứng từ những người đã thành công khi quyết định thay đổi định hướng nghề nghiệp ở cột mốc quan trọng.',
        content: `Bước sang tuổi 30 không phải là rào cản mà chính là lợi thế cạnh tranh khi bạn đã tích lũy được sự điềm tĩnh, kỹ năng giao tiếp và vốn sống phong phú.

Bằng việc xác định rõ kỹ năng chuyển đổi (transferable skills) như kỹ năng quản lý thời gian, tư duy logic và khả năng làm việc nhóm, kết hợp với lộ trình học tập tập trung 6-12 tháng, hàng nghìn nhân sự đã bứt phá thành công sang các lĩnh vực mới như Product Management, Data Analytics và UI/UX Design.

Học tập suốt đời chính là tấm vé bảo đảm cho tương lai sự nghiệp của bạn.`,
        category: 'Phát triển bản thân',
        categoryKey: 'self-dev',
        categoryDisplay: 'SỰ NGHIỆP',
        readTime: '6 phút đọc',
        author: 'Hoàng Nam',
        authorRole: 'Senior Product Lead',
        date: '05 Tháng 10, 2023',
        imageUrl: careerGrowthImg,
      },
      {
        id: 'art-trending-1',
        rank: '01',
        title: 'Top 10 công ty có môi trường làm việc tốt nhất 2023',
        summary:
          'Bảng xếp hạng tôn vinh các doanh nghiệp có chính sách đãi ngộ, văn hóa cởi mở và cơ hội thăng tiến vượt trội cho nhân sự.',
        content:
          'Dựa trên khảo sát độc lập từ 50.000 người lao động, các tập đoàn dẫn đầu về môi trường làm việc năm 2023 đã tạo dựng sự khác biệt nhờ chính sách chăm sóc sức khỏe toàn diện, văn hóa đa dạng & hòa nhập (D&I), cùng ngân sách đào tạo và phát triển năng lực cá nhân không giới hạn.',
        category: 'Xu hướng nghề nghiệp',
        categoryKey: 'market-trends',
        readTime: '5 phút đọc',
        author: 'Ban Biên Tập JobCentral',
        authorRole: 'Biên Tập Viên',
        date: '03 Tháng 10, 2023',
        views: '4.5k lượt xem',
        imageUrl: featuredCareerImg,
      },
      {
        id: 'art-trending-2',
        rank: '02',
        title: 'Cách trả lời câu hỏi "Điểm yếu của bạn là gì?"',
        summary:
          'Chiến lược biến câu hỏi khó nhằn nhất trong phòng phỏng vấn thành cơ hội thể hiện sự tự nhận thức và tinh thần cầu tiến.',
        content:
          'Đừng trả lời "tôi là người quá cầu toàn" - đó là câu trả lời sáo rỗng nhất! Thay vào đó, hãy chọn một điểm yếu thật nhưng không làm ảnh hưởng trực tiếp đến nhiệm vụ cốt lõi của vị trí ứng tuyển, và quan trọng nhất: Hãy trình bày cụ thể hành động bạn đang thực hiện để cải thiện điểm yếu đó mỗi ngày.',
        category: 'Bí quyết tìm việc',
        categoryKey: 'job-tips',
        readTime: '4 phút đọc',
        author: 'Lê Minh Khang',
        authorRole: 'Senior HR Manager',
        date: '02 Tháng 10, 2023',
        views: '3.8k lượt xem',
        imageUrl: salaryNegotiationImg,
      },
      {
        id: 'art-trending-3',
        rank: '03',
        title: 'Cẩm nang chuẩn bị cho vòng phỏng vấn kỹ thuật',
        summary:
          'Hướng dẫn ôn luyện thuật toán, kiến trúc hệ thống và cách giao tiếp hiệu quả khi live coding với hội đồng phỏng vấn.',
        content:
          'Bí quyết vượt qua vòng phỏng vấn kỹ thuật không chỉ là giải đúng bài toán, mà là cách bạn tư duy thành tiếng (think out loud). Hãy luôn làm rõ các giả định biên (edge cases), trao đổi với người phỏng vấn về độ phức tạp thuật toán (Time & Space Complexity) trước khi bắt tay viết dòng mã đầu tiên.',
        category: 'Góc chuyên gia',
        categoryKey: 'expert-corner',
        readTime: '6 phút đọc',
        author: 'Trần Vũ Hoàng',
        authorRole: 'Software Architect',
        date: '01 Tháng 10, 2023',
        views: '3.2k lượt xem',
        imageUrl: leadershipMeetingImg,
      },
    ];
  }, []);

  // Filtered articles based on category and search query
  const filteredLatestArticles = useMemo(() => {
    let list = allArticles.filter(
      (a) => a.id.startsWith('art-latest-') || (activeCategory !== 'all' && a.categoryKey === activeCategory)
    );

    // If on "all", show the 4 latest articles exactly as in the screenshot
    if (activeCategory === 'all') {
      list = allArticles.filter((a) => a.id.startsWith('art-latest-'));
    } else {
      list = allArticles.filter((a) => a.categoryKey === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allArticles, activeCategory, searchQuery]);

  const featuredArticle = allArticles.find((a) => a.id === 'art-featured-1');
  const topRightArticle1 = allArticles.find((a) => a.id === 'art-top-1');
  const topRightArticle2 = allArticles.find((a) => a.id === 'art-top-2');
  const trendingArticles = allArticles.filter((a) => a.rank);

  const searchTags = [
    '#ArtificialIntelligence',
    '#RemoteWork',
    '#SoftSkills',
    '#LươngBổng',
    '#CareerChange',
    '#GenZ',
  ];

  const handleToggleLike = (articleId, e) => {
    if (e) e.stopPropagation();
    setLikedArticleIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      return next;
    });
  };

  const handleToggleSave = (articleId, e) => {
    if (e) e.stopPropagation();
    setSavedArticleIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      return next;
    });
  };

  const handleShareArticle = (art, e) => {
    if (e) e.stopPropagation();
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      });
    }
  };

  const handleSubscribeSidebar = (e) => {
    e.preventDefault();
    if (!sidebarEmail.trim()) return;
    setSubscriptionSuccess(true);
    setSidebarEmail('');
    setTimeout(() => setSubscriptionSuccess(false), 4000);
  };

  const handleSubscribeBottom = (e) => {
    e.preventDefault();
    if (!bottomEmail.trim()) return;
    setSubscriptionSuccess(true);
    setBottomEmail('');
    setTimeout(() => setSubscriptionSuccess(false), 4000);
  };

  return (
    <div className="bg-[#FAF9FF] min-h-screen text-slate-800 antialiased">
      {/* 1. HERO BANNER: Cẩm nang Nghề nghiệp & Xu hướng */}
      <section className="bg-[#0A58CA] text-white pt-14 pb-16 sm:pt-18 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Cẩm nang Nghề nghiệp & Xu hướng
          </h1>
          <p className="mt-4 text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Nâng tầm sự nghiệp với những chia sẻ từ chuyên gia, cập nhật xu hướng thị trường lao động mới nhất và bí quyết chinh phục nhà tuyển dụng.
          </p>

          {/* Search bar inside Hero */}
          <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="bg-white rounded-full p-1.5 sm:p-2 pl-5 sm:pl-6 flex items-center justify-between shadow-xl shadow-blue-950/20 border border-white/20 transition-all focus-within:ring-3 focus-within:ring-blue-300"
            >
              <div className="flex items-center flex-1 mr-2 min-w-0">
                <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bài viết, xu hướng, kỹ năng..."
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none truncate"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors mr-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#0A58CA] hover:bg-[#084298] active:scale-95 text-white font-semibold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all cursor-pointer whitespace-nowrap shadow-xs shrink-0 select-none"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-[#0A58CA] text-white shadow-xs shadow-blue-500/25'
                    : 'bg-[#EAEFF7] hover:bg-[#DFE7F2] text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED HIGHLIGHT SECTION (Large Card + 2 Stacked Cards) */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Large Featured Article Card */}
            {featuredArticle && (
              <div
                onClick={() => setSelectedArticle(featuredArticle)}
                className="lg:col-span-8 relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] lg:min-h-[460px] group cursor-pointer shadow-sm border border-slate-200/80 flex flex-col justify-end transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 p-6 sm:p-8 md:p-10 text-white space-y-3">
                  <span className="inline-block px-3 py-1 bg-[#0A58CA] text-white text-[11px] font-black uppercase rounded-md tracking-wider shadow-xs">
                    {featuredArticle.badge || 'NỔI BẬT'}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug drop-shadow-xs group-hover:text-blue-100 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-3xl leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Right: Two White Cards Stacked Vertically */}
            <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
              {topRightArticle1 && (
                <div
                  onClick={() => setSelectedArticle(topRightArticle1)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between flex-1 cursor-pointer group"
                >
                  <div>
                    <span className="text-xs font-bold text-[#0A58CA] uppercase tracking-wider block mb-2">
                      {topRightArticle1.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0A58CA] transition-colors leading-snug">
                      {topRightArticle1.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                      {topRightArticle1.summary}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{topRightArticle1.readTime}</span>
                    </span>
                    <span className="text-[#0A58CA] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )}

              {topRightArticle2 && (
                <div
                  onClick={() => setSelectedArticle(topRightArticle2)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between flex-1 cursor-pointer group"
                >
                  <div>
                    <span className="text-xs font-bold text-[#0A58CA] uppercase tracking-wider block mb-2">
                      {topRightArticle2.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0A58CA] transition-colors leading-snug">
                      {topRightArticle2.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                      {topRightArticle2.summary}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{topRightArticle2.readTime}</span>
                    </span>
                    <span className="text-[#0A58CA] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. MAIN ARTICLES GRID & RIGHT SIDEBAR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Latest Articles Heading + 2-Column Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {searchQuery
                  ? `Kết quả tìm kiếm cho "${searchQuery}"`
                  : activeCategory === 'all'
                  ? 'Bài viết mới nhất'
                  : categories.find((c) => c.id === activeCategory)?.label || 'Bài viết'}
              </h2>
              {activeCategory !== 'all' || searchQuery ? (
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-xs sm:text-sm font-bold text-[#0A58CA] hover:underline cursor-pointer"
                >
                  Xem tất cả
                </button>
              ) : (
                <button
                  onClick={() => {
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-bold text-[#0A58CA] hover:underline cursor-pointer"
                >
                  Xem tất cả
                </button>
              )}
            </div>

            {filteredLatestArticles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-700">Không tìm thấy bài viết nào phù hợp</p>
                <p className="text-xs text-slate-400 mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-[#0A58CA] text-white rounded-full text-xs font-semibold"
                >
                  Xem tất cả bài viết
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredLatestArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg hover:border-blue-200 transition-all flex flex-col cursor-pointer group"
                  >
                    {/* Thumbnail Image */}
                    <div className="h-50 sm:h-52 w-full overflow-hidden relative bg-slate-100">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tag & Date */}
                        <div className="text-[11px] sm:text-xs font-bold text-[#0A58CA] uppercase tracking-wider">
                          <span>{art.categoryDisplay || art.category}</span>
                          <span className="mx-1.5">•</span>
                          <span className="text-slate-400 font-medium">{art.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0A58CA] transition-colors leading-snug mt-2">
                          {art.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>

                      {/* Author row */}
                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#E0EDFF] text-[#0A58CA] flex items-center justify-center font-bold text-xs ring-1 ring-blue-100 shrink-0">
                            {art.author.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-slate-700">
                            {art.author}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {art.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: Xu hướng tìm kiếm */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Xu hướng tìm kiếm
              </h3>
              <div className="pt-3.5 flex flex-wrap gap-2">
                {searchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag.replace('#', ''));
                    }}
                    className="bg-[#F1F5F9] hover:bg-[#E2E8F0] hover:text-[#0A58CA] text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors cursor-pointer select-none"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 2: Đọc nhiều nhất */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                Đọc nhiều nhất
              </h3>
              <div className="divide-y divide-slate-100">
                {trendingArticles.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                    className="py-4 first:pt-4 last:pb-0 flex items-start gap-4 cursor-pointer group"
                  >
                    <span className="text-xl sm:text-2xl font-black text-slate-300 font-mono tracking-tight shrink-0 w-8 group-hover:text-[#0A58CA] transition-colors">
                      {item.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A58CA] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 font-medium">
                        {item.views}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Blue Newsletter CTA Card */}
            <div className="bg-[#0A58CA] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  Luôn cập nhật thông tin mới nhất?
                </h3>
                <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                  Đăng ký để nhận những bài viết chọn lọc và xu hướng nghề nghiệp vào mỗi sáng thứ Hai.
                </p>

                <form onSubmit={handleSubscribeSidebar} className="mt-4 space-y-3">
                  <input
                    type="email"
                    required
                    value={sidebarEmail}
                    onChange={(e) => setSidebarEmail(e.target.value)}
                    placeholder="Email của bạn"
                    className="w-full bg-[#1A6FEF] border border-blue-400 text-white placeholder-blue-200/70 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-white transition"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-white text-[#0A58CA] hover:bg-blue-50 active:scale-98 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer text-center select-none"
                  >
                    Đăng ký ngay
                  </button>
                </form>

                {subscriptionSuccess && (
                  <div className="mt-3 text-xs bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1.5 animate-in fade-in">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Đã đăng ký nhận bản tin thành công!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BIG BOTTOM NEWSLETTER CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#F0F5FF] rounded-3xl p-8 sm:p-12 border border-blue-100 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left copy */}
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Stay updated with the latest career news
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              Tham gia cùng hơn 100,000+ chuyên gia nhận bản tin định kỳ từ JobCentral. Chúng tôi không bao giờ spam.
            </p>
          </div>

          {/* Right form */}
          <div className="flex-1 max-w-xl">
            <form onSubmit={handleSubscribeBottom} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={bottomEmail}
                onChange={(e) => setBottomEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn"
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0A58CA] focus:ring-2 focus:ring-blue-100 shadow-2xs"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#0A58CA] hover:bg-[#084298] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap select-none"
              >
                Đăng ký bản tin
              </button>
            </form>
            <p className="text-[11px] text-slate-400 mt-2.5 leading-normal">
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <a href="#terms" className="text-slate-500 underline hover:text-[#0A58CA]">
                Điều khoản dịch vụ
              </a>{' '}
              và{' '}
              <a href="#privacy" className="text-slate-500 underline hover:text-[#0A58CA]">
                Chính sách bảo mật
              </a>{' '}
              của chúng tôi.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CLEAN FOOTER MATCHING SCREENSHOT */}
      <footer className="border-t border-slate-200/90 bg-white text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Col 1: Brand & Copyright & Social icons */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-2xl font-black tracking-tight select-none">
                <span className="text-black">Job</span>
                <span className="text-[#0A58CA]">Central</span>
              </div>
              <p className="text-slate-400 text-xs mt-2">
                © 2024 JobCentral. Empowering your professional journey.
              </p>
              <div className="flex items-center space-x-4 pt-2 text-slate-400">
                <button
                  type="button"
                  title="Website"
                  className="p-1.5 rounded-full hover:bg-slate-100 hover:text-[#0A58CA] transition-colors cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Chia sẻ"
                  className="p-1.5 rounded-full hover:bg-slate-100 hover:text-[#0A58CA] transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Liên hệ"
                  className="p-1.5 rounded-full hover:bg-slate-100 hover:text-[#0A58CA] transition-colors cursor-pointer"
                >
                  <AtSign className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Col 2: Công ty */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs">Công ty</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#about" className="hover:text-[#0A58CA] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-[#0A58CA] transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#app" className="hover:text-[#0A58CA] transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Hỗ trợ */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs">Hỗ trợ</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#help" className="hover:text-[#0A58CA] transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-[#0A58CA] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-[#0A58CA] transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Tài liệu */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs">Tài liệu</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#handbook" className="text-[#0A58CA] font-semibold hover:underline">
                    Handbook
                  </a>
                </li>
                <li>
                  <a href="#trends" className="hover:text-[#0A58CA] transition-colors">
                    Market Trends
                  </a>
                </li>
                <li>
                  <a href="#interview" className="hover:text-[#0A58CA] transition-colors">
                    Interview Tips
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* 7. FULL ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            {/* Header / Close bar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
              <span className="text-xs font-bold text-[#0A58CA] uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={(e) => handleToggleSave(selectedArticle.id, e)}
                  title="Lưu bài viết"
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    savedArticleIds.has(selectedArticle.id)
                      ? 'bg-blue-50 border-blue-200 text-[#0A58CA]'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleShareArticle(selectedArticle, e)}
                  title="Chia sẻ liên kết"
                  className="p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {copyFeedback && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2 rounded-xl flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã sao chép liên kết bài viết vào bộ nhớ tạm!</span>
                </div>
              )}

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  {selectedArticle.title}
                </h1>

                {/* Author & Date metadata */}
                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-4 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-[#E0EDFF] text-[#0A58CA] flex items-center justify-center font-bold text-xs ring-1 ring-blue-100 shrink-0">
                    {selectedArticle.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {selectedArticle.author}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {selectedArticle.authorRole || 'Chuyên viên tư vấn'} • {selectedArticle.date} • {selectedArticle.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {selectedArticle.imageUrl && (
                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xs">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Summary lead */}
              <div className="bg-blue-50/60 border-l-4 border-[#0A58CA] p-4 rounded-r-xl">
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {selectedArticle.summary}
                </p>
              </div>

              {/* Full Article Content */}
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedArticle.content}
              </div>

              {/* Bottom interaction */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handleToggleLike(selectedArticle.id, e)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                    likedArticleIds.has(selectedArticle.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedArticleIds.has(selectedArticle.id) ? 'fill-rose-500' : ''}`} />
                  <span>Hữu ích ({likedArticleIds.has(selectedArticle.id) ? 1 : 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 bg-[#0A58CA] hover:bg-[#084298] text-white rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
