import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { inputs } = await req.json();

    const prompt = `You are an expert brand designer and communications consultant. Generate a comprehensive, professional Media Kit for:

Brand: ${inputs.brand_name || "Not specified"}
Tagline: ${inputs.tagline || "Not specified"}
Primary Color: ${inputs.primary_color || "Not specified"}
Accent Color: ${inputs.accent_color || "Not specified"}
Brand Tone & Voice: ${inputs.brand_tone || "Not specified"}
Target Audience: ${inputs.target_audience || "Not specified"}
Key Statistics: ${inputs.key_stats || "Not specified"}
Website & Social: ${inputs.social_links || "Not specified"}

Please generate a complete media kit including ALL of the following sections:

1. BRAND OVERVIEW — Brief introduction of the brand for media

2. LOGO USAGE GUIDELINES — Rules for using the brand logo: clear space requirements, minimum sizes, what NOT to do with the logo, acceptable color variations (full color, white reversed, black)

3. BRAND COLOR PALETTE — Provide the primary color and accent color with:
   - HEX code
   - RGB values
   - CMYK values (approximate)
   - When to use each color
   - Color combinations to avoid

4. TYPOGRAPHY GUIDELINES — Recommended primary and secondary typefaces (suggest Google Font equivalents), font weights for different use cases (headlines, body, captions)

5. BRAND VOICE & TONE GUIDE — Define the brand voice with:
   - Core voice attributes (e.g., bold, friendly, technical)
   - Dos and Don'ts (3-5 examples each)
   - Example copy in brand voice

6. KEY MESSAGES — 5 core brand messages with supporting proof points

7. MEDIA BOILERPLATE — A polished 100-150 word "About" paragraph for press use

8. KEY BRAND ASSETS CHECKLIST — What media can request (logos, photos, product shots, executive headshots, brand guidelines PDF)

9. SOCIAL MEDIA HANDLES & CONTACT — Official social channels and media contact info

Format professionally with clear section headers. This document should be ready to hand to a journalist or designer.`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API key not configured" }, { status: 500 });

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.7, max_tokens: 3000 }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `API error: ${response.status} - ${err}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No output generated." });
  } catch (err: unknown) {
    console.error("Media kit error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
