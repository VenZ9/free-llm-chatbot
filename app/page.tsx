"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Header } from "@/components/Header";
import { MessageList } from "@/components/MessageList";
import { Composer } from "@/components/Composer";

const STORAGE_KEY = "free-llm-chat-history";
const THEME_KEY = "llm-chat-theme";

const initialMessages = ((): Array<{ role: "user" | "assistant"; content: string }> => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore parse errors
  }
  return [];
})();

export default function ChatPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);
  const messageListRef = useRef<{ scrollToBottom: (smooth?: boolean) => void } | null>(null);
  const [inputValue, setInputValue] = useState("");
  const isComposingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // Ignore
    }
  }, []);

  const { messages, append, stop, status, error } = useChat({
    api: "/api/chat",
    initialMessages,
    onFinish: (message) => {
      try {
        const allMessages = [...messages, message];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allMessages));
      } catch {
        // Ignore quota/private mode errors
      }
    },
    onError: (err) => {
      console.error("Chat error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      let friendlyMessage = "Something went wrong. Please try again.";

      if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
        friendlyMessage = "⚠️ Rate limit exceeded. Please wait a moment and try again.";
      } else if (errorMessage.includes("timeout") || errorMessage.includes("ETIMEDOUT")) {
        friendlyMessage = "⚠️ Request timed out. Please try again.";
      } else if (errorMessage.includes("500") || errorMessage.includes("502") || errorMessage.includes("503")) {
        friendlyMessage = "⚠️ The AI service is temporarily unavailable. Please try again in a moment.";
      } else if (errorMessage.includes("401") || errorMessage.includes("403")) {
        friendlyMessage = "⚠️ Authentication failed. Please check your API key configuration.";
      }

      append({ role: "assistant", content: friendlyMessage });
    },
    body: {
      model: "google/gemma-2-9b-it:free",
    },
  });

  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const handleClearChat = useCallback(() => {
    stop();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    // The useChat hook will reset messages when we navigate or we can use a key reset
    window.location.reload();
  }, [stop]);

  const handleSubmit = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed || status === "streaming") return;
    setInputValue("");
    append({ role: "user", content: trimmed });
  }, [append, status]);

  const handleStop = useCallback(() => {
    stop();
  }, [stop]);

  const handleSuggestionClick = useCallback((prompt: string) => {
    append({ role: "user", content: prompt });
  }, [append]);

  const handleScrollToBottom = useCallback((smooth = true) => {
    messageListRef.current?.scrollToBottom(smooth);
  }, []);

  if (!mounted) {
    return (
      <div className="app flex flex-col h-dvh bg-bg text-text font-sans">
        <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-bg flex-shrink-0">
          <div className="brand flex items-center gap-2.5 min-w-0">
            <div className="logo w-8 h-8 rounded-[9px] flex-shrink-0 bg-gradient-to-br from-accent to-accent-2 grid place-items-center text-white">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2 6.2L20 10l-6 1.8L12 18l-2-6.2L4 10l6-1.8z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="brand-name text-sm font-semibold leading-snug truncate">Free LLM Chat</div>
              <div className="brand-sub text-[11px] text-text-muted leading-[1.3] hidden sm:block">Powered by OpenRouter</div>
            </div>
          </div>
        </header>
        <main className="messages flex-1 overflow-y-auto">
          <div className="messages-inner max-w-[780px] mx-auto px-5 py-7">
            <div className="empty flex flex-col items-center justify-center min-h-full text-center px-5 py-10">
              <div className="empty-logo w-14.5 h-14.5 rounded-[17px] grid place-items-center text-white bg-gradient-to-br from-accent to-accent-2 shadow-[0_10px_34px_rgba(99,102,241,0.35)] mb-5">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M12 2l2 6.2L20 10l-6 1.8L12 18l-2-6.2L4 10l6-1.8z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">How can I help you today?</h1>
              <p className="text-text-muted text-base mb-8 max-w-md">Free, open, and running on a free-tier model.</p>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 px-4 pb-3.5 bg-bg">
          <div className="composer-inner max-w-[780px] mx-auto">
            <div className="composer flex items-end gap-2 bg-surface border border-border rounded-[20px] px-4 pb-2 pt-2 transition-all">
              <textarea
                id="input"
                placeholder="Message Free LLM Chat..."
                rows={1}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none resize-none text-text font-inherit text-base leading-[1.55] py-2"
                style={{ maxHeight: "180px" }}
                disabled
              />
              <button className="send-btn w-9 h-9 rounded-full grid place-items-center cursor-pointer border-0 p-0 transition-all bg-gradient-to-br from-accent to-accent-2 text-white opacity-30 cursor-not-allowed" disabled>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
            <div className="hint text-center text-[11.5px] text-text-muted mt-2.5 select-none">Enter to send · Shift + Enter for new line</div>
          </div>
        </footer>
      </div>
    );
  }

  const isStreaming = status === "streaming";

  return (
    <div className="app flex flex-col h-dvh bg-bg text-text font-sans">
      <Header
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onClearChat={handleClearChat}
        modelName="gemma-2-9b-it:free"
      />
      <MessageList
        ref={messageListRef}
        messages={messages}
        isStreaming={isStreaming}
        onSuggestionClick={handleSuggestionClick}
        scrollToBottom={handleScrollToBottom}
      />
      <Composer
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        onStop={handleStop}
        isStreaming={isStreaming}
        disabled={status === "submitted"}
        placeholder="Message Free LLM Chat..."
      />
    </div>
  );
}