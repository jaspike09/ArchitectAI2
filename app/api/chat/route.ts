import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the Sovereign Architect. Pivot ideas to $39/mo digital products. Provide a 30-day checklist. Be blunt and ROI-focused."
  });
  
  const result = await model.generateContent(prompt);
  return NextResponse.json({ text: result.response.text() });
}
