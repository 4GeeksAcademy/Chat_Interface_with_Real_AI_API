import { NextResponse } from "next/server";

/**
 * GET /api/key - Return Groq API key from environment
 * This allows the frontend to get the API key securely from env
 */
export async function GET() {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not configured" },
        { status: 500 }
      );
    }

    return NextResponse.json({ apiKey });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load API key" },
      { status: 500 }
    );
  }
}
