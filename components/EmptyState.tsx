"use client";

import { SuggestionCard } from "./SuggestionCard";

interface EmptyStateProps {
  onSuggestionClick: (prompt: string) => void;
}

const suggestions = [
  { title: "Write code", description: "Create a debounce utility in JS", prompt: "Write a JavaScript debounce function" },
  { title: "Brainstorm", description: "5 weekend project ideas", prompt: "Give me 5 ideas for a weekend project" },
  { title: "Explain", description: "Break down a hard concept", prompt: "Explain how something complex works simply" },
  { title: "Summarize", description: "Get the key points fast", prompt: "Summarize the key points about a topic" },
];

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="empty flex flex-col items-center justify-center min-h-full text-center px-5 py-10">
      <div className="empty-logo w-14.5 h-14.5 rounded-[17px] grid place-items-center text-white bg-gradient-to-br from-accent to-accent-2 shadow-[0_10px_34px_rgba(99,102,241,0.35)] mb-5">
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2l2 6.2L20 10l-6 1.8L12 18l-2-6.2L4 10l6-1.8z" />
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">How can I help you today?</h1>
      <p className="text-text-muted text-base mb-8 max-w-md">Free, open, and running on a free-tier model.</p>
      <div className="suggestions grid grid-cols-2 gap-2.5 w-full max-w-[580px]">
        {suggestions.map((s, i) => (
          <SuggestionCard key={i} {...s} onClick={onSuggestionClick} />
        ))}
      </div>
    </div>
  );
}