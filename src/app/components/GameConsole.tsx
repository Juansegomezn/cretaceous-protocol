'use client';
import { useGame } from "../hooks/useGame";
import { useEffect, useRef } from "react";
import { Typewriter } from "./TypeWritter";
import { ResetModal } from "./ResetModal";

export default function GameConsole() {
  const { messages, input, isLoading, handleSubmit, handleInputChange, isResetModalOpen, setIsResetModalOpen, handleResetClick, confirmReset } = useGame();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-[90vh] max-w-4xl mx-auto bg-black border-2 border-green-900/50 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.2)] overflow-hidden font-mono">
      {/* System Header */}
      <div className="bg-green-900/20 p-2 border-b border-green-900/50 flex justify-between items-center text-xs text-green-500">
        <span>SISTEMA: CRETACEOUS_PROTOCOL_V1.0</span>
        <button 
          onClick={handleResetClick}
          className="text-[15px] px-2 border border-red-900/50 text-red-700 hover:bg-red-900 hover:text-white uppercase font-bold"
        >
          [ Reiniciar Protocolo ]
        </button>
        <span className="animate-pulse">● EN LINEA</span>
      </div>
      {/* Messages Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-scroll p-6 space-y-6 custom-terminal-scroll"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {/* Text Bubble */}
            <div className={`max-w-[80%] p-4 rounded-lg ${
              msg.role === 'user' 
              ? 'bg-green-900/30 text-green-100 border border-green-700/50' 
              : 'bg-slate-900/50 text-green-400 border border-slate-700/50 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]'
            }`}>
              <div className="leading-relaxed whitespace-pre-wrap">
                {msg.role === 'user' ? (
                  `> ${msg.content}`
                ) : (
                  <Typewriter text={msg.content} />
                )}
              </div>
            </div>
            {/* Async Image Rendering */}
            {msg.role === 'assistant' && (
              <div className="mt-4 min-w-100 max-w-full h-100 rounded border-2 border-green-900/30 overflow-hidden bg-slate-950">
                {msg.imageLoading ? (
                  <div className="h-full px-4 flex items-center justify-center animate-pulse text-green-800 text-sm">
                    PROCESANDO SEÑAL VISUAL...
                  </div>
                ) : msg.image ? (
                  <img 
                    src={msg.image} 
                    alt="Visual Feed" 
                    className="h-full pixelated animate-in fade-in zoom-in duration-700"
                  />
                ) : null}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="text-green-500 animate-bounce text-sm italic">
            Procesando datos del sector...
          </div>
        )}
      </div>
      {/* Command Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-green-900/10 border-t border-green-900/50">
        <div className="flex gap-3 items-center">
          <span className="text-green-500 py-2">{'>'}</span>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu siguiente acción..."
            className="w-full bg-transparent border-none outline-none text-green-500 resize-none py-2 px-1 font-mono leading-6 custom-terminal-scroll"            
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
                (e.target as HTMLTextAreaElement).style.height = 'auto';
              }
            }}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 max-h-10 bg-green-900/40 text-green-500 border border-green-700 hover:bg-green-800/50 disabled:opacity-30 disabled:cursor-not-allowed uppercase text-xs font-bold"
          >
            Enviar
          </button>
        </div>
      </form>

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={confirmReset}
        title="ALERTA DE SISTEMA: REINICIO REQUERIDO"
        message="¿Reiniciar protocolo? Se borrarán todos los datos del protocolo actual."
      />
    </div>
  );
}