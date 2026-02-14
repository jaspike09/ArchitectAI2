import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const roles = [
      { id: "CMO", focus: "Marketing" },
      { id: "CPO", focus: "Product" },
      { id: "CFO", focus: "Finance" }
    ];

    const boardResults = await Promise.all(
      roles.map(async (role) => {
        const res = await model.generateContent(`Role: ${role.id}. Focus: ${role.focus}. Idea: ${prompt}`);
        return { role: role.id, feedback: res.response.text() };
      })
    );

    const architectRes = await model.generateContent(
      `Summarize this into a 5-step Master Plan: ${JSON.stringify(boardResults)}`
    );

    return NextResponse.json({
      architect: architectRes.response.text(),
      board: boardResults
    });
  } catch (error) {
    return NextResponse.json({ error: "API Key Error" }, { status: 500 });
  }
}
