"use client";

import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { EmptyState } from "./EmptyState";
import { ScrollToBottomButton } from "./ScrollToBottomButton";
import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from "react";

interface MessageListProps {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  isStreaming: boolean;
  onSuggestionClick: (prompt: string) => void;
  scrollToBottom: (smooth?: boolean) => void;
}

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isStreaming, onSuggestionClick, scrollToBottom }, ref) => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    useImperativeHandle(ref, () => ({
      scrollToBottom: (smooth = true) => {
        if (messagesRef.current) {
          if (smooth) {
            messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
          } else {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
          }
        }
      },
    }));

    useEffect(() => {
      const messagesEl = messagesRef.current;
      if (!messagesEl) return;

      const handleScroll = () => {
        const nearBottom = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 160;
        setShowScrollBtn(!nearBottom && messages.length > 0);
      };

      messagesEl.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => messagesEl.removeEventListener("scroll", handleScroll);
    }, [messages.length]);

    const handleScrollToBottom = () => {
      scrollToBottom(true);
    };

    if (messages.length === 0) {
      return (
        <main className="messages flex-1 overflow-y-auto" ref={messagesRef}>
          <div className="messages-inner max-w-[780px] mx-auto px-5 py-7 sm:px-5 sm:py-7" ref={innerRef}>
            <EmptyState onSuggestionClick={onSuggestionClick} />
          </div>
        </main>
      );
    }

    return (
      <>
        <main className="messages flex-1 overflow-y-auto" ref={messagesRef}>
          <div className="messages-inner max-w-[780px] mx-auto px-5 py-7 sm:px-5 sm:py-7" ref={innerRef}>
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} />
            ))}
            {isStreaming && <TypingIndicator />}
          </div>
        </main>
        <ScrollToBottomButton messagesRef={messagesRef} show={showScrollBtn} onClick={handleScrollToBottom} />
      </>
    );
  }
);

MessageList.displayName = "MessageList";