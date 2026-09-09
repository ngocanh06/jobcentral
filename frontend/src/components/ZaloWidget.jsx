import { useState } from "react";
import { MoreHorizontal, ChevronDown, Send, ArrowLeft } from "lucide-react";

export default function ZaloChatWidget() {
  const [open, setOpen] = useState(false);
  const [quickChatOpen, setQuickChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendQuickMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), text: trimmedMessage, from: "user" },
      {
        id: Date.now() + 1,
        text: "Cảm ơn bạn đã nhắn tin. JobCentral sẽ phản hồi bạn sớm nhất!",
        from: "support",
      },
    ]);
    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        aria-label={open ? "Đóng chat Zalo" : "Mở chat Zalo"}
        className="
          fixed bottom-6 right-9 z-[9999]
          flex h-14 w-14
          items-center justify-center
          shadow-xl
          rounded-2xl
          transition
          hover:scale-105 
        "
      >
        <img
          src="/picture/Logo_ZaloWidget.png"
          alt={open ? "Đóng chat Zalo" : "Mở chat Zalo"}
          className="h-12 w-12 rounded-2xl object-contain"
        />
      </button>

      {open && (
        <div
          className="
            fixed bottom-24 right-6
            z-[9999]
            w-[400px]
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
            flex flex-col
            zalo-widget-open
          "
        >

          {/* HEADER */}
          <div className="bg-gradient-to-br from-[#0068ff] to-blue-600 px-5 pb-5 pt-5 text-white">
            
            {/* Top */}
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="
                    relative flex h-12 w-12
                    items-center justify-center
                    rounded-full bg-white
                    text-center
                    shadow
                  "
                >
                  <div className="text-[10px] font-bold leading-3 text-slate-700">
                    <img src="/picture/Logo_JobCentral.png" alt="logo" />
                  </div>
                </div>

                <h2 className="text-base font-semibold">
                  JobCentral official
                </h2>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-full
                    bg-white/20
                    transition hover:bg-white/30
                  "
                >
                  <MoreHorizontal size={18} />
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-full
                    bg-white/20
                    transition hover:bg-white/30
                  "
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* BODY */}
          {!quickChatOpen ? (
            <div className="flex min-h-[500px] flex-col justify-center bg-slate-50/50 px-6 py-10">
              <p className="mb-6 text-center text-sm text-slate-500">
                Bắt đầu trò chuyện với JobCentral official
              </p>

              <button
                className="h-11 w-full rounded-lg bg-[#0068ff] text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
                onClick={() => {
                  window.open(
                    "https://zalo.me/0962522881",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                Chat bằng Zalo
              </button>

              <button
                className="mt-3 h-11 w-full rounded-lg bg-slate-200 text-base font-medium text-slate-700 transition hover:bg-slate-300"
                onClick={() => setQuickChatOpen(true)}
              >
                Chat nhanh
              </button>
            </div>
          ) : (
            <div className="flex min-h-[500px] flex-col bg-slate-50/50">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-5 py-3">
                <button
                  type="button"
                  onClick={() => setQuickChatOpen(false)}
                  aria-label="Quay lại lựa chọn chat"
                  className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <ArrowLeft size={18} />
                </button>
                <span className="text-sm font-semibold text-slate-700">Chat nhanh</span>
              </div>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
                {messages.length === 0 && (
                  <p className="m-auto text-center text-sm text-slate-500">
                    Hãy gửi câu hỏi, JobCentral sẽ hỗ trợ bạn.
                  </p>
                )}
                {messages.map((chatMessage) => (
                  <div
                    key={chatMessage.id}
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      chatMessage.from === "user"
                        ? "self-end rounded-br-sm bg-[#0068ff] text-white"
                        : "self-start rounded-bl-sm bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {chatMessage.text}
                  </div>
                ))}
              </div>

              <form
                className="flex gap-2 border-t border-slate-200 bg-white p-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendQuickMessage();
                }}
              >
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Nhập tin nhắn..."
                  aria-label="Nội dung tin nhắn"
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-[#0068ff] focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="submit"
                  aria-label="Gửi tin nhắn"
                  disabled={!message.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0068ff] text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={17} />
                </button>
              </form>
            </div>
          )}          
        </div>
      )}
    </>
  );
}