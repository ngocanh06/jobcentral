import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export const NewsView = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Kiến thức & Xu hướng nghề nghiệp</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cẩm Nang & Tin Tức Nghề Nghiệp
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Cập nhật xu hướng tuyển dụng, bí quyết phỏng vấn và phát triển sự nghiệp trong ngành công nghệ & thiết kế.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            id={`news-card-${art.id}`}
            onClick={() => setSelectedArticle(art)}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-pointer flex flex-col group"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-xs">
                {art.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{art.readTime}</span>
                </div>

                <span className="text-indigo-600 font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Read Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              {selectedArticle.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-3">
              {selectedArticle.title}
            </h2>
            <div className="flex items-center space-x-4 text-xs text-slate-500 pb-4 border-b border-slate-100 mb-6">
              <span>Tác giả: {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
            </div>

            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-xs"
            />

            <div className="prose prose-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-semibold text-slate-900 text-base leading-relaxed">{selectedArticle.summary}</p>
              <p>{selectedArticle.content}</p>
              <p>
                Để thành công trong thị trường tuyển dụng đầy cạnh tranh ngày nay, các ứng viên cần liên tục trau dồi cả kỹ năng chuyên môn (Hard skills) lẫn kỹ năng mềm (Soft skills), xây dựng mạng lưới quan hệ đồng nghiệp và giữ tinh thần học tập suốt đời.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-all shadow-sm shadow-indigo-200"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
