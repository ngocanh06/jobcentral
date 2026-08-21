import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Send,
  Paperclip,
  Image as ImageIcon,
  MoreVertical,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  MapPin,
  DollarSign,
  User,
  X,
  Check,
  CheckCheck,
} from 'lucide-react';

export const MessagesView = ({
  currentUser,
  onViewJobDetail,
  onNavigateToJobs,
  onNavigateToCompany,
}) => {
  // Mock conversations matching the screenshot exactly
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      recruiterName: 'Phạm Thu Hà',
      recruiterRole: 'HR Manager',
      companyName: 'TechFlow Solutions',
      companyLogo:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      avatarType: 'image',
      online: true,
      jobTitle: 'Senior UI/UX Designer',
      jobSalary: '25 - 35 triệu',
      jobLocation: 'Quận 1, TP. Hồ Chí Minh',
      jobId: 'job-1',
      unreadCount: 0,
      lastMessage: 'Bạn có thể sắp xếp một buổi...',
      lastTime: '10:43 AM',
      isTimeHighlighted: true,
      status: 'interview_invited',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          text: 'Chào chị Hà, em đã nộp hồ sơ cho vị trí Senior UI/UX Designer qua JobCentral. Không biết bên mình đã nhận được chưa ạ?',
          time: '09:30 AM',
          status: 'read',
        },
        {
          id: 'm2',
          sender: 'recruiter',
          text: 'Chào Minh Anh, cảm ơn bạn đã quan tâm đến vị trí Senior UI/UX Designer tại TechFlow Solutions.',
          time: '10:42 AM',
          status: 'read',
        },
        {
          id: 'm3',
          sender: 'recruiter',
          text: 'Team tuyển dụng đã xem qua Portfolio của bạn và rất ấn tượng với các dự án Fintech bạn từng làm. Bạn có thể sắp xếp một buổi phỏng vấn online qua Google Meet vào chiều thứ Năm tuần này lúc 14:00 được không?',
          time: '10:43 AM',
          status: 'read',
        },
      ],
    },
    {
      id: 'conv-2',
      recruiterName: 'Trần Văn Nam',
      recruiterRole: 'Senior Tech Recruiter',
      companyName: 'VNG Corporation',
      companyLogo:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=80',
      avatarText: 'TV',
      avatarBg: 'bg-[#1877F2]',
      avatarType: 'initials',
      online: false,
      jobTitle: 'Senior React / Next.js Frontend Developer',
      jobSalary: '35 - 50 triệu',
      jobLocation: 'Quận 7, TP. Hồ Chí Minh',
      jobId: 'job-2',
      unreadCount: 0,
      lastMessage: 'Cảm ơn bạn đã ứng tuyển.',
      lastTime: 'Yesterday',
      isTimeHighlighted: false,
      status: 'reviewing',
      messages: [
        {
          id: 'm2-1',
          sender: 'recruiter',
          text: 'Chào bạn, mình là Nam phụ trách tuyển dụng mảng Web Platform tại VNG Campus.',
          time: 'Yesterday 14:20',
          status: 'read',
        },
        {
          id: 'm2-2',
          sender: 'user',
          text: 'Chào anh Nam, em vừa nộp hồ sơ ứng tuyển vị trí Senior React Developer cho dự án E-commerce.',
          time: 'Yesterday 14:35',
          status: 'read',
        },
        {
          id: 'm2-3',
          sender: 'recruiter',
          text: 'Cảm ơn bạn đã ứng tuyển. Bên mình đã nhận được CV và đang gửi cho Engineering Manager xem xét nhé.',
          time: 'Yesterday 15:10',
          status: 'read',
        },
      ],
    },
    {
      id: 'conv-3',
      recruiterName: 'Lê Thị Mai',
      recruiterRole: 'Talent Acquisition Specialist',
      companyName: 'MoMo (M_Service)',
      companyLogo:
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
      avatarText: 'L',
      avatarBg: 'bg-[#1877F2]',
      avatarType: 'initials',
      online: true,
      jobTitle: 'Product Growth Manager (Fintech)',
      jobSalary: '40 - 65 triệu',
      jobLocation: 'Quận 7, TP. Hồ Chí Minh',
      jobId: 'job-5',
      unreadCount: 0,
      lastMessage: 'Chúng tôi sẽ phản hồi sớm.',
      lastTime: 'Mon',
      isTimeHighlighted: false,
      status: 'reviewing',
      messages: [
        {
          id: 'm3-1',
          sender: 'recruiter',
          text: 'Chào bạn, mình là Mai từ phòng nhân sự MoMo.',
          time: 'Mon 09:15',
          status: 'read',
        },
        {
          id: 'm3-2',
          sender: 'user',
          text: 'Chào chị Mai, em rất quan tâm đến các giải pháp thanh toán của MoMo.',
          time: 'Mon 09:30',
          status: 'read',
        },
        {
          id: 'm3-3',
          sender: 'recruiter',
          text: 'Chúng tôi sẽ phản hồi sớm sau khi hội đồng tuyển dụng đánh giá hồ sơ bạn nhé.',
          time: 'Mon 11:20',
          status: 'read',
        },
      ],
    },
    {
      id: 'conv-4',
      recruiterName: 'Vũ Đức Thành',
      recruiterRole: 'Head of Engineering Recruitment',
      companyName: 'Shopee Vietnam',
      companyLogo:
        'https://images.unsplash.com/photo-1556742049-0a67e55722c6?w=120&auto=format&fit=crop&q=80',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      avatarType: 'image',
      online: true,
      jobTitle: 'Fullstack Golang & React Engineer',
      jobSalary: '45 - 60 triệu',
      jobLocation: 'Quận 1, TP. Hồ Chí Minh',
      jobId: 'job-6',
      unreadCount: 0,
      lastMessage: 'Shopee vừa gửi bài test thuật toán qua HackerRank.',
      lastTime: 'Sun',
      isTimeHighlighted: false,
      status: 'interview_invited',
      messages: [
        {
          id: 'm4-1',
          sender: 'recruiter',
          text: 'Chào bạn, Shopee đã nhận được đơn ứng tuyển vị trí Fullstack Engineer.',
          time: 'Sun 16:00',
          status: 'read',
        },
        {
          id: 'm4-2',
          sender: 'recruiter',
          text: 'Shopee vừa gửi bài test thuật toán qua HackerRank cho bạn nhé. Chúc bạn làm bài thật tốt!',
          time: 'Sun 16:05',
          status: 'read',
        },
      ],
    },
    {
      id: 'conv-5',
      recruiterName: 'Hoàng Kim Ngân',
      recruiterRole: 'Tech Recruiter Lead',
      companyName: 'One Mount Group',
      companyLogo:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
      avatarText: 'KN',
      avatarBg: 'bg-indigo-600',
      avatarType: 'initials',
      online: false,
      jobTitle: 'Data Engineer & Analytics Specialist',
      jobSalary: '30 - 45 triệu',
      jobLocation: 'Hai Bà Trưng, Hà Nội',
      jobId: 'job-7',
      unreadCount: 0,
      lastMessage: 'Hẹn gặp bạn trong buổi phỏng vấn offline.',
      lastTime: '17/08',
      isTimeHighlighted: false,
      status: 'connected',
      messages: [
        {
          id: 'm5-1',
          sender: 'recruiter',
          text: 'Chào Minh Anh, One Mount Group rất chào đón bạn ứng tuyển vị trí Data Engineer.',
          time: '17/08 14:00',
          status: 'read',
        },
        {
          id: 'm5-2',
          sender: 'recruiter',
          text: 'Hẹn gặp bạn trong buổi phỏng vấn offline tại Times City tuần tới.',
          time: '17/08 15:30',
          status: 'read',
        },
      ],
    },
  ]);

  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const messagesEndRef = useRef(null);

  const activeConv =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  // Handle select conversation
  const handleSelectConv = (convId) => {
    setActiveConvId(convId);
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    return (
      conv.recruiterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle sending a message
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 -> 12
    const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    const newMessage = {
      id: `user-m-${Date.now()}`,
      sender: 'user',
      text: text,
      time: timeStr,
      status: 'sent',
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: text,
            lastTime: timeStr,
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );

    setInputText('');

    // Recruiter auto reply simulation
    setTimeout(() => {
      const now2 = new Date();
      let hours2 = now2.getHours();
      const minutes2 = String(now2.getMinutes()).padStart(2, '0');
      const ampm2 = hours2 >= 12 ? 'PM' : 'AM';
      hours2 = hours2 % 12;
      hours2 = hours2 ? hours2 : 12;
      const replyTime = `${String(hours2).padStart(2, '0')}:${minutes2} ${ampm2}`;

      const replyText =
        'Cảm ơn bạn đã phản hồi nhanh chóng! Đội ngũ tuyển dụng sẽ gửi link họp Google Meet và tài liệu chuẩn bị qua email của bạn nhé.';

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            return {
              ...c,
              lastMessage: replyText,
              lastTime: replyTime,
              messages: [
                ...c.messages,
                {
                  id: `recruiter-reply-${Date.now()}`,
                  sender: 'recruiter',
                  text: replyText,
                  time: replyTime,
                  status: 'delivered',
                },
              ],
            };
          }
          return c;
        })
      );
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full bg-white text-left animate-in fade-in duration-200 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-70px)] h-[calc(100vh-70px)] max-w-[1600px] mx-auto">
        {/* LEFT COLUMN: Sidebar Messages List (md:col-span-4 lg:col-span-3) */}
        <div className="md:col-span-4 lg:col-span-3 border-r border-slate-200 flex flex-col h-full bg-white">
          {/* Header Title & Search Box */}
          <div className="p-4 sm:p-5 border-b border-slate-100">
            <h2 className="text-base sm:text-[17px] font-bold text-slate-900 mb-3 tracking-tight">
              Tin nhắn với nhà tuyển dụng
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-[#f0f4f9] rounded-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(conv.id)}
                  className={`relative p-3.5 sm:px-4 sm:py-3.5 transition-colors cursor-pointer flex items-center space-x-3 text-left ${
                    isSelected
                      ? 'bg-[#edf3fd]'
                      : 'hover:bg-slate-50/80 bg-white'
                  }`}
                >
                  {/* Active Blue Left Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-[#1877F2]" />
                  )}

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {conv.avatarType === 'image' ? (
                      <img
                        src={conv.avatar}
                        alt={conv.recruiterName}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div
                        className={`w-11 h-11 rounded-full ${conv.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-2xs`}
                      >
                        {conv.avatarText}
                      </div>
                    )}

                    {/* Online status indicator dot */}
                    {conv.online ? (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
                    ) : (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 rounded-full ring-2 ring-white" />
                    )}
                  </div>

                  {/* Conv Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                        {conv.recruiterName}
                      </h4>
                      <span
                        className={`text-[11px] shrink-0 ml-1 ${
                          conv.isTimeHighlighted
                            ? 'text-[#1877F2] font-semibold'
                            : 'text-slate-400 font-normal'
                        }`}
                      >
                        {conv.lastTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate leading-tight">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat Panel (md:col-span-8 lg:col-span-9) */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col h-full bg-white relative">
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
            {/* Recruiter & Company Info */}
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative shrink-0">
                {activeConv.avatarType === 'image' ? (
                  <img
                    src={activeConv.avatar}
                    alt={activeConv.recruiterName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full ${activeConv.avatarBg} text-white font-bold text-sm flex items-center justify-center`}
                  >
                    {activeConv.avatarText}
                  </div>
                )}
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 truncate leading-snug">
                  {activeConv.recruiterName} - {activeConv.recruiterRole}
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToCompany && onNavigateToCompany(activeConv.companyName)}
                  title={`Xem trang công ty ${activeConv.companyName}`}
                  className="text-xs text-slate-500 hover:text-[#1877F2] hover:underline truncate font-normal block text-left cursor-pointer transition-colors"
                >
                  {activeConv.companyName}
                </button>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 relative shrink-0">
              {/* "Thông tin" Button with briefcase icon */}
              <button
                type="button"
                id="chat-header-company-info-btn"
                title={`Xem thông tin công ty ${activeConv.companyName}`}
                onClick={() => {
                  if (onNavigateToCompany) {
                    onNavigateToCompany(activeConv.companyName);
                  } else {
                    setShowInfoModal(true);
                  }
                }}
                className="px-3.5 py-1.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs group"
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1877F2] transition-colors" />
                <span className="group-hover:text-slate-900">Thông tin</span>
              </button>

              {/* 3 dots Menu Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {showMoreMenu && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 text-xs font-medium text-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreMenu(false);
                        if (onNavigateToCompany) {
                          onNavigateToCompany(activeConv.companyName);
                        }
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center space-x-2 text-slate-700 hover:text-[#1877F2]"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Xem trang {activeConv.companyName}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInfoModal(true);
                        setShowMoreMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>Xem tóm tắt ứng tuyển</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        window.open('https://meet.google.com', '_blank');
                        setShowMoreMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mở Google Meet</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 sm:px-8 space-y-5 bg-white">
            {/* Centered Date Badge */}
            <div className="flex justify-center my-1">
              <span className="px-3.5 py-1 bg-[#f1f5f9] text-slate-600 rounded-full text-xs font-medium">
                Today, 09:30 AM
              </span>
            </div>

            {/* Message Items */}
            {activeConv.messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className="space-y-1">
                  {isUser ? (
                    /* User Message (Right - Blue Bubble) */
                    <div className="flex flex-col items-end">
                      <div className="bg-[#1877F2] text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-[85%] sm:max-w-[70%] lg:max-w-[62%] text-xs sm:text-[13px] leading-relaxed shadow-2xs font-normal">
                        {msg.text}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 pr-1 font-normal">
                        {msg.time}
                      </span>
                    </div>
                  ) : (
                    /* Recruiter Message (Left - Light Blue/Gray Bubble with Avatar) */
                    <div className="flex items-start space-x-2.5 max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]">
                      {/* Avatar Thumbnail */}
                      <div className="shrink-0 mt-0.5">
                        {activeConv.avatarType === 'image' ? (
                          <img
                            src={activeConv.avatar}
                            alt={activeConv.recruiterName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div
                            className={`w-7 h-7 rounded-full ${activeConv.avatarBg} text-white font-bold text-[10px] flex items-center justify-center`}
                          >
                            {activeConv.avatarText}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="bg-[#ebf2fc] text-slate-800 rounded-2xl rounded-tl-xs px-4 py-3 text-xs sm:text-[13px] leading-relaxed shadow-2xs font-normal">
                          {msg.text}
                        </div>
                        <span className="text-[11px] text-slate-400 mt-1 pl-1 block font-normal">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-4 sm:px-6 sm:pb-4 sm:pt-3 bg-white border-t border-slate-200 shrink-0">
            <form onSubmit={handleSendMessage}>
              <div className="bg-[#eff4fc] border border-[#dbe6f6] rounded-xl px-3 py-2 sm:py-2.5 flex items-center space-x-2.5">
                {/* Paperclip Icon */}
                <button
                  type="button"
                  title="Đính kèm tệp / CV"
                  onClick={() => {
                    const fakeFileMsg = {
                      id: `user-att-${Date.now()}`,
                      sender: 'user',
                      text: '📎 Đã đính kèm hồ sơ: CV_Senior_UIUX_Designer_2026.pdf (2.4 MB)',
                      time: '10:45 AM',
                      status: 'sent',
                    };
                    setConversations((prev) =>
                      prev.map((c) =>
                        c.id === activeConvId
                          ? { ...c, messages: [...c.messages, fakeFileMsg] }
                          : c
                      )
                    );
                  }}
                  className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                >
                  <Paperclip className="w-4 h-4 stroke-[2]" />
                </button>

                {/* Image Icon */}
                <button
                  type="button"
                  title="Gửi hình ảnh"
                  onClick={() => {
                    const fakeImgMsg = {
                      id: `user-img-${Date.now()}`,
                      sender: 'user',
                      text: '🖼️ Đã gửi hình ảnh Portfolio_Project_Mockup.png',
                      time: '10:46 AM',
                      status: 'sent',
                    };
                    setConversations((prev) =>
                      prev.map((c) =>
                        c.id === activeConvId
                          ? { ...c, messages: [...c.messages, fakeImgMsg] }
                          : c
                      )
                    );
                  }}
                  className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                >
                  <ImageIcon className="w-4 h-4 stroke-[2]" />
                </button>

                {/* Text Input Field */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-0 outline-hidden text-xs sm:text-sm text-slate-800 placeholder:text-slate-400"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-lg bg-[#1877F2] hover:bg-[#1565d8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5 -ml-0.5" />
                </button>
              </div>

              {/* Subtitle helper text */}
              <p className="text-[11px] text-slate-400 mt-2 text-left pl-1">
                Press Enter to send, Shift+Enter for new line
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* "Thông tin" Modal Dialog */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 p-6 relative text-left">
            <button
              type="button"
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center font-bold text-lg border border-blue-100">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {activeConv.companyName}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{activeConv.jobLocation}</span>
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mb-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Vị trí trao đổi:</span>
                <span className="font-bold text-slate-900">{activeConv.jobTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Mức lương:</span>
                <span className="font-bold text-emerald-600">{activeConv.jobSalary}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Người liên hệ:</span>
                <span className="font-semibold text-slate-800">
                  {activeConv.recruiterName} ({activeConv.recruiterRole})
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Lịch phỏng vấn đề xuất
              </h4>
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#1877F2]" />
                  <span>Chiều thứ Năm (14:00) qua Google Meet</span>
                </div>
                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#1877F2] hover:underline"
                >
                  Mở Meet →
                </a>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInfoModal(false);
                  if (onNavigateToCompany) {
                    onNavigateToCompany(activeConv.companyName);
                  }
                }}
                className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Trang công ty</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInfoModal(false);
                  if (onViewJobDetail) {
                    onViewJobDetail({
                      id: activeConv.jobId,
                      title: activeConv.jobTitle,
                      company: activeConv.companyName,
                      salary: activeConv.jobSalary,
                      location: activeConv.jobLocation,
                    });
                  }
                }}
                className="px-4 py-2 bg-[#1877F2] hover:bg-[#1565d8] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Xem chi tiết JD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
