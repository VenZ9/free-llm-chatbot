"use client";

export function TypingIndicator() {
  return (
    <div id="typingIndicator" className="msg assistant flex gap-3 animate-fadeUp">
      <div className="avatar w-7.5 h-7.5 rounded-[9px] flex-shrink-0 grid place-items-center bg-gradient-to-br from-accent to-accent-2 text-white">
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
          <path d="M12 2l2 6.2L20 10l-6 1.8L12 18l-2-6.2L4 10l6-1.8z" />
        </svg>
      </div>
      <div className="msg-body pt-1">
        <div className="typing flex gap-1.5 py-2">
          <span className="w-1.75 h-1.75 rounded-full bg-text-muted opacity-40 animate-bounce" style={{ animationDelay: "0s" }} />
          <span className="w-1.75 h-1.75 rounded-full bg-text-muted opacity-40 animate-bounce" style={{ animationDelay: "0.16s" }} />
          <span className="w-1.75 h-1.75 rounded-full bg-text-muted opacity-40 animate-bounce" style={{ animationDelay: "0.32s" }} />
        </div>
      </div>
    </div>
  );
}