"use client";

interface SuggestionCardProps {
  title: string;
  description: string;
  prompt: string;
  onClick: (prompt: string) => void;
}

export function SuggestionCard({ title, description, prompt, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={() => onClick(prompt)}
      className="suggestion text-left p-3.5 rounded-xl bg-surface border border-border text-text cursor-pointer transition-all hover:border-accent hover:bg-accent-soft"
      style={{ transform: "translateY(0)" }}
    >
      <b className="block text-sm font-semibold mb-1">{title}</b>
      <span className="text-[12.5px] text-text-muted">{description}</span>
    </button>
  );
}