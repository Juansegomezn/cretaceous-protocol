import { type NextRequest, NextResponse } from "next/server";
import { GAME_PROMPTS } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    if (!apiKey) {
      throw new Error("Protocolo fallido: Falta POLLINATIONS_API_KEY en el entorno.");
    }

    const { imagePrompt } = await request.json();
    const promptText = typeof imagePrompt === 'object' ? imagePrompt.description : imagePrompt;
    const fullPrompt = GAME_PROMPTS.GENERATE_IMAGE(promptText);

    const response = await fetch("https://gen.pollinations.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        model: "flux",
        n: 1,
        size: "400x400",
        quality: "medium",
        response_format: "b64_json",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error de Pollinations: ${response.status}`);
    }

    const data = await response.json();
    
    const b64Data = data.data[0].b64_json;
    const base64Image = `data:image/png;base64,${b64Data}`;

    return NextResponse.json({ image: base64Image });
  } catch (error: any) {
    console.error('Visual Protocol (Pollinations) Error:', error.message);
    
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}