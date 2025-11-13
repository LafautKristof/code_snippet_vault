import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
export const client = apiKey ? new OpenAI({ apiKey }) : null;

export async function generateSnippet(prompt: string, language: string) {
    if (!client) {
        console.warn("⚠️ No OpenAI key found — skipping AI generation.");
        return `// AI generation is disabled (no API key)\n// You asked: ${prompt}`;
    }

    const systemPrompt = `
You are a helpful code assistant.
Generate clean and minimal ${language} code that does what the user asks.
Do NOT include explanations, only return code.
`;

    try {
        const res = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt },
            ],
        });

        const code = res.choices[0]?.message?.content ?? "";
        return code.trim();
    } catch (err: any) {
        console.error("❌ AI generation error:", err);
        return `// AI error: ${
            err.message || "unknown"
        }\n// You asked: ${prompt}`;
    }
}
