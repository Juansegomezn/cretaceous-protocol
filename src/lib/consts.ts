export const UI_MESSAGES = {
  LOADING: {
    STORY: 'Descodificando registros del protocolo...',
    IMAGE: 'Sintetizando señal visual...'
  },
  ERROR: {
    STORY_GENERATION: 'Error de Protocolo: Fallo en la secuencia narrativa.',
    IMAGE_GENERATION: 'Error Visual: Señal perdida durante la síntesis.',
    MISSING_PROMPT: 'Error de Entrada: El sistema requiere una acción para continuar.'
  },
  PLACEHOLDERS: {
    INPUT: 'Describe tu siguiente movimiento, hacia dónde ir o cómo reaccionar...'
  }
};

export const GAME_CONFIG = {
  IMAGE: {
    DEFAULT_PROMPT: 'escena de supervivencia prehistórica estilo pixel art 16-bit',
    SEPARATOR: 'IMAGEN:'
  },
  MODEL_SETTINGS: {
    TEMPERATURE: 0.7,
    MAX_TOKENS: 500
  }
};