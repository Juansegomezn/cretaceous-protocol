import { HfInference } from "@huggingface/inference";
import { type NextRequest, NextResponse } from "next/server";
import { GAME_PROMPTS } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const token = process.env.HF_TOKEN;
    if (!token) {
      throw new Error("Protocolo fallido: Falta HF_TOKEN en el entorno.");
    }

    const hf = new HfInference(token);
    const { imagePrompt } = await request.json();
    const fullPrompt = GAME_PROMPTS.GENERATE_IMAGE(imagePrompt);

    const response = await hf.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0", 
      inputs: fullPrompt,
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

    return NextResponse.json({ image: base64Image });

  } catch (error: any) {
    console.error('Visual Protocol Error:', error.message);
    
    const status = error.message.includes("401") || error.message.includes("Invalid") ? 401 : 500;
    
    return NextResponse.json(
      { error: error.message },
      { status }
    );
  }
}