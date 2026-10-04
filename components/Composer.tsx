"use client";

import { useRef, useEffect, useCallback } from "react";

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function Composer({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming,
  disabled = false,
  placeholder = "Message Free LLM Chat...",
}: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastHeightRef = useRef(0);

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 180);
    if (newHeight !== lastHeightRef.current) {
      textarea.style.height = `${newHeight}px`;
      lastHeightRef.current = newHeight;
    }
  }, []);

  useEffect(() => {
    autoResize();
  }, [value, autoResize]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isStreaming && !disabled) {
        onSubmit(value);
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <footer className="flex-shrink-0 px-4 pb-3.5 bg-bg">
      <div className="composer-inner max-w-[780px] mx-auto">
        <div className="composer flex items-end gap-2 bg-surface border border-border rounded-[20px] px-4 pb-2 pt-2 transition-all">
          <textarea
            ref={textareaRef}
            id="input"
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none resize-none text-text font-inherit text-base leading-[1.55] py-2"
            style={{ maxHeight: "180px" }}
            aria-label="Message input"
          />
          <div className="flex items-center gap-1.5">
            <span className="watermark">Built with Rudra</span>
            {!isStreaming ? (
              <button
                onClick={() => onSubmit(value)}
                disabled={!value.trim() || isStreaming || disabled}
                className="send-btn w-9 h-9 rounded-full grid place-items-center cursor-pointer border-0 p-0 transition-all bg-gradient-to-br from-accent to-accent-2 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.06]"
                title="Send"
                aria-label="Send message"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={onStop}
                className="stop-btn w-9 h-9 rounded-full grid place-items-center cursor-pointer border border-border bg-surface-2 text-text p-0 transition-all hover:border-accent"
                title="Stop generating"
                aria-label="Stop generating"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="hint text-center text-[11.5px] text-text-muted mt-2.5 select-none">Enter to send · Shift + Enter for new line</div>
      </div>
    </footer>
  );
}