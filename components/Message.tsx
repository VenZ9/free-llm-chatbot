"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const avatarUser = (
  <span className="text-[11px] font-bold">U</span>
);

const avatarAssistant = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M12 2l2 6.2L20 10l-6 1.8L12 18l-2-6.2L4 10l6-1.8z" />
  </svg>
);

export function Message({ role, content, isStreaming = false }: MessageProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const copyTimeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      const timeout = setTimeout(() => {
        setCopiedIndex(null);
        copyTimeouts.current.delete(index);
      }, 1600);
      copyTimeouts.current.set(index, timeout);
    } catch {
      setCopiedIndex(-1);
      const timeout = setTimeout(() => {
        setCopiedIndex(null);
        copyTimeouts.current.delete(index);
      }, 1600);
      copyTimeouts.current.set(index, timeout);
    }
  };

  useEffect(() => {
    return () => {
      copyTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const renderCodeBlock = ({ node }: { node: { children: string; language?: string; meta?: string; index?: number } }) => {
    const language = node.language || "text";
    const code = node.children;
    const index = node.index || 0;

    return (
      <div className="code-block my-4 rounded-xl overflow-hidden border border-code-bg bg-code-bg" key={index}>
        <div className="code-head flex items-center justify-between px-3 py-2 bg-surface border-b border-border font-mono text-[11.5px] text-text-muted">
          <span>{language}</span>
          <button
            onClick={() => handleCopy(code, index)}
            className={`copy-btn px-2.5 py-1 text-[11px] font-mono rounded-md border transition-all ${
              copiedIndex === index ? "text-emerald-500 border-emerald-500" : "text-text-muted border-border hover:text-text hover:border-accent"
            }`}
          >
            {copiedIndex === index ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="m-0 p-4 overflow-x-auto"><code className="font-mono text-[13px] leading-[1.62] text-text whitespace-pre">{code}</code></pre>
      </div>
    );
  };

  const renderInlineCode = ({ children }: { children: React.ReactNode }) => (
    <code className="inline font-mono text-[0.87em] bg-surface border border-border px-1.5 py-0.5 rounded-md">
      {children}
    </code>
  );

  if (role === "user") {
    return (
      <div className="msg user flex gap-3 mb-6 animate-fadeUp flex-row-reverse">
        <div className="avatar w-7.5 h-7.5 rounded-[9px] flex-shrink-0 grid place-items-center bg-surface border border-border text-text-muted">
          {avatarUser}
        </div>
        <div className="msg-body min-w-0 max-w-full bg-surface border border-border rounded-2xl rounded-tr-sm px-4 py-2.5 text-base leading-[1.6]">
          <div className="whitespace-pre-wrap break-words">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="msg assistant flex gap-3 mb-6 animate-fadeUp">
      <div className="avatar w-7.5 h-7.5 rounded-[9px] flex-shrink-0 grid place-items-center bg-gradient-to-br from-accent to-accent-2 text-white">
        {avatarAssistant}
      </div>
      <div className="msg-body min-w-0 flex-1 pt-1">
        <ReactMarkdown
          components={{
            code: renderCodeBlock,
            inlineCode: renderInlineCode,
          }}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        >
          {content}
        </ReactMarkdown>
        {isStreaming && <span className="cursor inline-block w-1.5 h-4 bg-accent align-[-2px] ml-0.5 rounded-[1px] animate-blink" />}
      </div>
    </div>
  );
}