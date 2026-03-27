import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { GAME_PROMPTS } from "@/lib/prompts";
import { GAME_CONFIG } from "@/lib/consts";
import { GenerateStoryRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { userMessage, conversationStory, isNewGame } : GenerateStoryRequest = await request.json();

    let prompt:string = GAME_PROMPTS.INITIAL_STORY;

    if (!isNewGame) {
      let historyText = conversationStory.map((message) => `${message.role}: ${message.content}`).join('\n');
      prompt = GAME_PROMPTS.CONTINUE_STORY(historyText, userMessage);
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt
    })
    const [ story, imagePrompt ] = text.split(GAME_CONFIG.IMAGE.SEPARATOR);
    
    return NextResponse.json({ story, imagePrompt });
  } catch (error) {
    console.error('Error parsing request body', error);
    return NextResponse.error();
  }
}