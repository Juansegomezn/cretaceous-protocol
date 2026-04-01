import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { GAME_PROMPTS } from "@/lib/prompts";
import { GAME_CONFIG } from "@/lib/consts";
import { GenerateStoryRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { userMessage, conversationStory, isNewGame } : GenerateStoryRequest = await request.json();

    let prompt:string = isNewGame 
      ? GAME_PROMPTS.INITIAL_STORY 
      : GAME_PROMPTS.CONTINUE_STORY(conversationStory.map(m => `${m.role}: ${m.content}`).join('\n'), userMessage)
    ;

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
      temperature: GAME_CONFIG.MODEL_SETTINGS.TEMPERATURE,
      maxOutputTokens: GAME_CONFIG.MODEL_SETTINGS.MAX_TOKENS
    })

    const parts = text.split(GAME_CONFIG.IMAGE.SEPARATOR);
    const story = parts[0]?.trim() || "Comunicación interrumpida...";
    
    const imagePrompt = {
      description: parts[1]?.trim() || GAME_CONFIG.IMAGE.DEFAULT_PROMPT
    };

    return NextResponse.json({ story, imagePrompt });
  } catch (error: any) {
    const lastError = error.lastError || error;
    const statusCode = lastError.statusCode || lastError.status;

    console.log('Status Code Detectado:', statusCode);

    if (statusCode === 429) {
      return NextResponse.json({ 
        story: "⚠️[SISTEMA]: Se ha agotado la energía del satélite de comunicaciones. Por favor, prueba en otro momento.", 
        imagePrompt: { 
          description: "emergency terminal broadcast, red signal lost message, green glitched CRT static, dark background" 
        } 
      }, { status: 200 });
    }

    console.error('Fatal Error:', error);
    return NextResponse.json({ 
      story: "❌[ERROR CRÍTICO]: Fallo en el núcleo de datos del Protocolo. Reinicia el sistema.", 
      imagePrompt: { description: "darkness, terminal error screen" } 
    }, { status: 200 });
  }
}