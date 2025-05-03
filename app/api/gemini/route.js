import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question || question.trim() === '') {
      return NextResponse.json(
        { error: "Please enter a question first!" },
        { status: 401 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a legal assistant. Answer this question simply and clearly and in Hindi language until specified:\n\n${question}`,
            },
          ],
        },
      ],
    });

    const response = await result.response.text();

    return NextResponse.json({ answer: response }, { status: 200 });

  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Failed to get response from Gemini" },
      { status: 500 }
    );
  }
}
