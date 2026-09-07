import React from 'react';
import {
  Briefcase,
  Building2,
  MessageSquare,
  Bookmark,
  User,
  Sparkles,
} from 'lucide-react';

export const MobileBottomNav = ({
  activeTab,
  onTabChange,
  savedCount = 0,
  currentUser,
  onOpenProfileDrawer,
  onOpenAuth,
}) => {
  const tabs = [
    {
      id: 'jobs',
      label: 'Việc làm',
      icon: Briefcase,
    },
    {
      id: 'companies',
      label: 'Công ty',
      icon: Building2,
    },
    {
      id: 'messages',
      label: 'Tin nhắn',
      icon: MessageSquare,
      badge: true,
    },
    {
      id: 'saved',
      label: 'Đã lưu',
      icon: Bookmark,
      count: savedCount,
    },
  ];

  return (
    <div
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] select-none"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
    >
      <nav className="grid grid-cols-5 items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`mobile-bottom-nav-${tab.id}`}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-[#0A58CA]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-[#0A58CA] rounded-full ring-2 ring-white" />
                )}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-3.5 h-3.5 bg-[#0A58CA] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-1 ring-white">
                    {tab.count > 9 ? '9+' : tab.count}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium tracking-tight truncate max-w-[56px] leading-none ${
                  isActive ? 'font-bold text-[#0A58CA]' : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Account / Profile Tab */}
        <button
          id="mobile-bottom-nav-account"
          type="button"
          onClick={() => {
            if (currentUser) {
              onOpenProfileDrawer();
            } else {
              onOpenAuth('login');
            }
          }}
          className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer relative ${
            currentUser ? 'text-[#0A58CA]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover ring-2 ring-[#0A58CA]"
              />
            ) : currentUser ? (
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0A58CA] text-[10px] font-bold flex items-center justify-center ring-1 ring-[#0A58CA]">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
            ) : (
              <User className="w-5 h-5 stroke-[1.8]" />
            )}
            {currentUser && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span
            className={`text-[10px] mt-1 font-medium tracking-tight truncate max-w-[56px] leading-none ${
              currentUser ? 'font-bold text-[#0A58CA]' : 'text-slate-500'
            }`}
          >
            {currentUser ? 'Tôi' : 'Tài khoản'}
          </span>
        </button>
      </nav>
    </div>
  );
};
