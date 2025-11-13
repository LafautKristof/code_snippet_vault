import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful code assistant." },
            { role: "user", content: prompt },
        ],
    });

    return NextResponse.json({
        result: res.choices[0].message?.content || "",
    });
}
