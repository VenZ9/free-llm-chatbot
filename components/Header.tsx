"use client";

import { useState, useEffect } from "react";

export function Header({
  theme,
  onThemeToggle,
  onClearChat,
  modelName = "gemma-2-9b-it:free",
}: {
  theme: "light" | "dark";
  onThemeToggle: () => void;
  onClearChat: () => void;
  modelName?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
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
        <div className="topbar-actions flex items-center gap-2 flex-shrink-0">
          <div className="model-pill font-mono text-[11.5px] text-text-muted bg-surface border border-border px-3 py-1 rounded-full whitespace-nowrap hidden sm:block">
            {modelName}
          </div>
          <button
            onClick={onThemeToggle}
            className="icon-btn w-8 h-8 rounded-lg border border-border bg-surface text-text-muted grid place-items-center cursor-pointer transition-all hover:text-text hover:border-accent p-0"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {theme === "dark" ? (
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              )}
            </svg>
          </button>
          <button
            onClick={onClearChat}
            className="icon-btn w-8 h-8 rounded-lg border border-border bg-surface text-text-muted grid place-items-center cursor-pointer transition-all hover:text-text hover:border-accent p-0"
            title="Clear chat"
            aria-label="Clear chat"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            </svg>
          </button>
        </div>
      </header>
    );
  }

  return (
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
      <div className="topbar-actions flex items-center gap-2 flex-shrink-0">
        <div className="model-pill font-mono text-[11.5px] text-text-muted bg-surface border border-border px-3 py-1 rounded-full whitespace-nowrap hidden sm:block">
          {modelName}
        </div>
        <button
          onClick={onThemeToggle}
          className="icon-btn w-8 h-8 rounded-lg border border-border bg-surface text-text-muted grid place-items-center cursor-pointer transition-all hover:text-text hover:border-accent p-0"
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {theme === "dark" ? (
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </>
            )}
          </svg>
        </button>
        <button
          onClick={onClearChat}
          className="icon-btn w-8 h-8 rounded-lg border border-border bg-surface text-text-muted grid place-items-center cursor-pointer transition-all hover:text-text hover:border-accent p-0"
          title="Clear chat"
          aria-label="Clear chat"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          </svg>
        </button>
      </div>
    </header>
  );
}