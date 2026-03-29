import { GamePromptStructure } from './types';

export const GAME_PROMPTS: GamePromptStructure = {
  INITIAL_STORY: `
    Eres el narrador de 'Cretaceous Protocol', una aventura de supervivencia jurásica en pixel art.
    Genera la escena inicial: recuperas el conocimiento entre los restos de un helicóptero estrellado en una selva densa. La lluvia golpea el metal y un rugido lejano hace temblar el suelo. No hay rastro de la tripulación, solo huellas gigantes en el lodo.    
    REGLAS DE ESTILO:
    1. Máximo 2 párrafos MUY breves (máximo 3 frases por párrafo).
    2. Tono directo, frío y tenso.
    3. Termina preguntando qué decide hacer el jugador.  
  `,
    
  CONTINUE_STORY: (historyText, userMessage) => `
    Continúa la historia de supervivencia jurásica 'Cretaceous Protocol' en español.
    
    Historial: ${historyText}
    Acción del Jugador: "${userMessage}"

    Describe las consecuencias en MÁXIMO 2 párrafos cortos (máximo 3 frases por párrafo). 
    Enfócate en lo sensorial (sonidos, sombras, peligro). 
    SIEMPRE termina con una pregunta directa para involucrar al jugador.
  `,

  GENERATE_IMAGE: (description) => 
    `16-bit pixel art, wide shot, cinematic lighting, vivid colors, prehistoric survival: ${description}. Sharp edges, retro game aesthetic.`
};