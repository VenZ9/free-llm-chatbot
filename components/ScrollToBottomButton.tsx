"use client";

import { useEffect, useRef } from "react";

interface ScrollToBottomButtonProps {
  messagesRef: React.RefObject<HTMLDivElement | null>;
  show: boolean;
  onClick: () => void;
}

export function ScrollToBottomButton({ messagesRef, show, onClick }: ScrollToBottomButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const messagesEl = messagesRef.current;
    if (!messagesEl) return;

    const handleScroll = () => {
      const nearBottom = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 160;
      // The show state is controlled by parent, but we can update visibility here if needed
    };

    messagesEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => messagesEl.removeEventListener("scroll", handleScroll);
  }, [messagesRef]);

  if (!show) return null;

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className="scroll-btn fixed left-1/2 -translate-x-1/2 bottom-27 z-10 w-8.5 h-8.5 rounded-full bg-surface border border-border text-text-muted grid place-items-center cursor-pointer transition-all opacity-0 pointer-events-none translate-y-2.5"
      style={{ transform: "translateX(-50%) translateY(0)" }}
      title="Scroll to bottom"
      aria-label="Scroll to bottom"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </button>
  );
}