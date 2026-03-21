import { GamePromptStructure } from './types';

export const GAME_PROMPTS: GamePromptStructure = {
  INITIAL_STORY: [
    // Alternative 1:
    `Eres el narrador de 'Cretaceous Protocol', una aventura de supervivencia jurásica en pixel art. 
    Genera la escena inicial: despiertas en una cápsula criogénica dañada en un laboratorio de alta seguridad. Las alarmas rojas parpadean y el cristal está roto. Algo masivo escapó dejando un rastro de destrucción. El aire huele a ozono y sangre.
    Sé directo (MÁXIMO 2 párrafos). Termina preguntando qué decide hacer el jugador.
    IMPORTANTE: Al final, incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para generar una escena pixel art (máx 50 palabras).`,

    // Alternative 2:
    `Eres el narrador de 'Cretaceous Protocol', una aventura de supervivencia jurásica en pixel art. 
    Genera la escena inicial: recuperas el conocimiento entre los restos de un helicóptero estrellado en una selva densa. La lluvia golpea el metal y un rugido lejano hace temblar el suelo. No hay rastro de la tripulación, solo huellas gigantes en el lodo.
    Sé directo (MÁXIMO 2 párrafos). Termina preguntando qué decide hacer el jugador.
    IMPORTANTE: Al final, incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para generar una escena pixel art (máx 50 words).`,

    // Alternative 3:
    `Eres el narrador de 'Cretaceous Protocol', una aventura de supervivencia jurásica en pixel art. 
    Genera la escena inicial: estás atrapado en un puesto de observación sin energía. Solo las luces de emergencia iluminan el lugar. Escuchas garras veloces rascando el techo de metal sobre ti. Las pantallas de seguridad muestran estática y sombras moviéndose.
    Sé directo (MÁXIMO 2 párrafos). Termina preguntando qué decide hacer el jugador.
    IMPORTANTE: Al final, incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para generar una escena pixel art (máx 50 words).`
  ],

  CONTINUE_STORY: (historyText, userMessage) => 
    `Continúa la historia de supervivencia jurásica 'Cretaceous Protocol' en español.
    
    Historial: ${historyText}
    Acción del Jugador: "${userMessage}"

    Describe las consecuencias de manera dramática e inmersiva en MÁXIMO 2 párrafos cortos en español. Mantén la tensión alta.
    SIEMPRE termina con una pregunta para involucrar al jugador.
    IMPORTANTE: Al final, incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para la nueva escena pixel art (máx 50 palabras).`,

  GENERATE_IMAGE: (description) => 
    `Detailed 16-bit pixel art, cinematic lighting, 16:9 aspect ratio, prehistoric survival theme: ${description}. High quality retro aesthetic.`
};