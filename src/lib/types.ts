export interface GamePromptStructure {
  INITIAL_STORY: string[];
  CONTINUE_STORY: (historyText: string, userMessage: string) => string;
  GENERATE_IMAGE: (description: string) => string;
}

export interface GameMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  imageLoading?: boolean;
}

export interface GeneratedImage {
  base64Data: string;
  mediaType: string;
  uint8ArrayData: Uint8Array;
}