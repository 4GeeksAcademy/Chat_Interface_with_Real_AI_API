import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse, ChatError } from "@/types/chat";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

/**
 * POST /api/chat - Send message to Groq API and get response
 *
 * This endpoint securely proxies requests to the Groq API.
 * The GROQ_API_KEY is stored in .env.local and never exposed to the frontend.
 *
 * Request body:
 * {
 *   "messages": [
 *     { "role": "user", "content": "Hello" },
 *     { "role": "assistant", "content": "Hi!" }
 *   ],
 *   "model": "mixtral-8x7b-32768" // optional, defaults to mixtral
 * }
 *
 * Response:
 * {
 *   "id": "msg_123",
 *   "content": "Response text",
 *   "model": "mixtral-8x7b-32768",
 *   "usage": {
 *     "promptTokens": 10,
 *     "completionTokens": 20,
 *     "totalTokens": 30
 *   },
 *   "responseTime": 1234 // milliseconds
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json<ChatError>(
        {
          error: "Groq API key not configured",
          code: "MISSING_API_KEY",
          statusCode: 500,
        },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const { messages, model = DEFAULT_MODEL } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json<ChatError>(
        {
          error: "Messages array is required and cannot be empty",
          code: "INVALID_REQUEST",
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);

      return NextResponse.json<ChatError>(
        {
          error: errorData.error?.message || "Groq API request failed",
          code: errorData.error?.code || "API_ERROR",
          statusCode: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract relevant data from Groq response
    const choice = data.choices?.[0];
    if (!choice) {
      throw new Error("No choices in Groq response");
    }

    const content = choice.message?.content || "";
    const usage = data.usage || {};

    const chatResponse: ChatResponse = {
      id: data.id || `msg_${Date.now()}`,
      content,
      model,
      usage: {
        promptTokens: usage.prompt_tokens || 0,
        completionTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      },
      responseTime,
    };

    return NextResponse.json<ChatResponse>(chatResponse);
  } catch (error) {
    console.error("Chat API error:", error);

    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json<ChatError>(
      {
        error: message,
        code: "INTERNAL_ERROR",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
