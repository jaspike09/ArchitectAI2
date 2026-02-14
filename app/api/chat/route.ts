import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const roles = [
      { name: "CMO", task: "Marketing and Growth" },
      { name: "CPO", task: "Product and MVP features" },
      { name: "CFO", task: "Revenue and Pricing" }
    ];

    const boardResponses = await Promise.all(
      roles.map(async (role) => {
        const result = await model.generateContent(`Role: ${role.name}. Task: ${role.task}. Analyze: ${prompt}`);
        return { role: role.name, feedback: result.response.text() };
      })
    );

    const architectResult = await model.generateContent(
      `Summarize these board notes into a 5-step master plan: ${JSON.stringify(boardResponses)}`
    );

    return NextResponse.json({
      architect: architectResult.response.text(),
      board: boardResponses
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
