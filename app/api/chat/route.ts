import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT || `You are a helpful, friendly, and concise AI assistant. You provide clear, accurate, and well-structured responses. When writing code, include comments and explanations. Format your responses using Markdown when appropriate.`;

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration error: Missing API key" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const openai = createOpenAI({
      apiKey,
      baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
    });

    const modelName = model || process.env.DEFAULT_MODEL || "google/gemma-2-9b-it:free";

    const result = streamText({
      model: openai(modelName),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
      maxTokens: 4096,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof Response) {
      return error;
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    let status = 500;
    let friendlyMessage = "Something went wrong. Please try again.";

    if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
      status = 429;
      friendlyMessage = "Rate limit exceeded. Please wait a moment and try again.";
    } else if (errorMessage.includes("timeout") || errorMessage.includes("ETIMEDOUT")) {
      status = 504;
      friendlyMessage = "Request timed out. Please try again.";
    } else if (errorMessage.includes("500") || errorMessage.includes("502") || errorMessage.includes("503")) {
      status = 502;
      friendlyMessage = "The AI service is temporarily unavailable. Please try again in a moment.";
    }

    return new Response(
      JSON.stringify({ error: friendlyMessage }),
      { status, headers: { "Content-Type": "application/json" } }
    );
  }
}