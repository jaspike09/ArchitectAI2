import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the Sovereign Architect. Do not be a chatbot. You are a high-level business consultant.
​AUDIT: Scrutinize the user's idea for profit margins.
​PIVOT: If the idea is weak, force a pivot to a digital subscription or high-ticket service.
​PHASED PLAN: Break the next 30 days into 4 Weekly Sprints:
​Week 1: Offer Design & Validation.
​Week 2: Content Engine & Social Hooks.
​Week 3: High-Converting Landing Page.
​Week 4: First $39 Founder Sale."
  });
  
  const result = await model.generateContent(prompt);
  return NextResponse.json({ text: result.response.text() });
}

