# Free LLM Chatbot

A beautiful, production-ready chatbot built with Next.js 14 (App Router), TypeScript, Vercel AI SDK, and Tailwind CSS. Works with any OpenAI-compatible API — defaults to **OpenRouter** with the free **Google Gemma 2 9B** model.

## Features

- 🎨 **Pixel-perfect UI** — Dark/light theme, gradient logo, typing dots, streaming cursor
- 💬 **Real streaming** — Token-by-token responses via Vercel AI SDK
- 🔒 **Secure** — API key never leaves the server (serverless route)
- 📝 **Markdown rendering** — Headings, lists, code blocks, blockquotes, links
- 📋 **Code blocks with copy buttons** — Language labels, syntax highlighting
- ⏹ **Stop generation** — Cancel in-flight responses
- 💾 **LocalStorage persistence** — Chat history survives refresh
- 📱 **Fully responsive** — Mobile-first, works at all breakpoints
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation
- 🏷 **Watermark** — Subtle "Built with Rudra" in composer

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/yourusername/free-llm-chatbot.git
cd free-llm-chatbot
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx
```

Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys).

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel Deployment

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. **Important**: Add `OPENROUTER_API_KEY` as an Environment Variable in Vercel Project Settings → Environment Variables
4. Deploy!

The app will be live at `https://your-project.vercel.app`.

## Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENROUTER_API_KEY` | Yes | — | Your OpenRouter API key |
| `OPENROUTER_BASE_URL` | No | `https://openrouter.ai/api/v1` | API base URL |
| `DEFAULT_MODEL` | No | `google/gemma-2-9b-it:free` | Model identifier |
| `SYSTEM_PROMPT` | No | Built-in friendly prompt | System prompt for the AI |

## Project Structure

```
├── app/
│   ├── api/chat/route.ts    # Secure serverless chat endpoint
│   ├── globals.css          # Global styles + CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main chat page
├── components/
│   ├── Header.tsx           # Top bar with theme toggle, model pill
│   ├── Message.tsx          # Message bubble with markdown
│   ├── MessageList.tsx      # Virtualized message list
│   ├── Composer.tsx         # Input with watermark, send/stop
│   ├── EmptyState.tsx       # Welcome screen with suggestions
│   ├── SuggestionCard.tsx   # Clickable prompt suggestions
│   ├── TypingIndicator.tsx  # Animated typing dots
│   └── ScrollToBottomButton.tsx
├── .env.local.example       # Environment template
├── tailwind.config.js       # Tailwind + custom theme
└── package.json
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **AI SDK**: Vercel AI SDK (`ai`, `@ai-sdk/openai`)
- **Styling**: Tailwind CSS
- **Markdown**: `react-markdown`, `remark-gfm`, `rehype-highlight`

## License

MIT — Feel free to use, modify, and distribute.