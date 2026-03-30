import { InferenceClient  } from "@huggingface/inference";
import { type NextRequest, NextResponse } from "next/server";
import { GAME_PROMPTS } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.HF_TOKEN) {
      throw new Error("Protocolo fallido: Falta HF_TOKEN en el entorno.");
    }

    const client = new InferenceClient(process.env.HF_TOKEN);
    const { imagePrompt } = await request.json();
    const promptText = typeof imagePrompt === 'object' ? imagePrompt.description : imagePrompt;
    const fullPrompt = GAME_PROMPTS.GENERATE_IMAGE(promptText);

    const image = (await client.textToImage({
      provider: "hf-inference",
      model: "stabilityai/stable-diffusion-xl-base-1.0", 
      inputs: fullPrompt,
    })) as unknown as Blob;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
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