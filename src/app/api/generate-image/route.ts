import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { GAME_PROMPTS } from "@/lib/prompts";
import { GAME_CONFIG } from "@/lib/consts";
import { GenerateImageRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { imagePrompt } : GenerateImageRequest = await request.json();

    let prompt:string = GAME_PROMPTS.GENERATE_IMAGE(imagePrompt);

    const { files } = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      prompt,
      providerOptions: {
        google: {
          temperature: GAME_CONFIG.MODEL_SETTINGS.TEMPERATURE,
          maxTokens: GAME_CONFIG.MODEL_SETTINGS.MAX_TOKENS,
          responseModalities: ['IMAGE']
        }
      }
    })
    
    return NextResponse.json({ image: files[0] || null });
  } catch (error) {
    console.error('Error parsing request body', error);
    return NextResponse.error();
  }
}