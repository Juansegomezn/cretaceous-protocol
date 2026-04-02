'use client';
import { useGame } from "../hooks/useGame";
import { useEffect, useRef } from "react";
import { Typewriter } from "./TypeWritter";
import { ResetModal } from "./ResetModal";

export default function GameConsole() {
  const { messages, input, isLoading, handleSubmit, handleInputChange, isResetModalOpen, setIsResetModalOpen, handleResetClick, confirmReset, wordCount, maxWords } = useGame();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-[85vh] md:h-[90vh] w-full max-w-4xl mx-auto bg-black border border-green-900/50 md:border-2 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.1)] overflow-hidden font-mono transition-all">
      {/* System Header */}
      <div className="bg-green-900/20 p-2 md:p-3 border-b border-green-900/50 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] md:text-xs text-green-500">
        <span className="hidden sm:inline font-bold">SISTEMA: CRETACEOUS_PROTOCOL_V1.0</span>
        <span className="sm:hidden font-bold">SISTEMA: CP_V1.0</span>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleResetClick}
            className="text-[10px] md:text-xs px-2 py-0.5 border border-red-900/50 text-red-700 hover:bg-red-900 hover:text-white uppercase font-bold transition-all active:scale-95"
          >
            [ Reiniciar ]
          </button>
          <span className="animate-pulse whitespace-nowrap">● EN LINEA</span>
        </div>
      </div>
      {/* Messages Container */}
      <div ref={scrollRef} className="flex-1 overflow-y-scroll p-3 md:p-6 space-y-4 md:space-y-6 custom-terminal-scroll">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] md:max-w-[80%] p-3 md:p-4 rounded-lg ${
              msg.role === 'user' 
              ? 'bg-green-900/20 text-green-100 border border-green-700/30' 
              : 'bg-slate-900/40 text-green-400 border border-slate-700/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]'
            }`}>
              <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {msg.role === 'user' ? `> ${msg.content}` : <Typewriter text={msg.content} />}
              </div>
            </div>

            {msg.role === 'assistant' && (
              <div className="mt-3 w-full sm:w-100 aspect-square rounded border border-green-900/30 overflow-hidden bg-slate-950">
                {msg.imageLoading ? (
                  <div className="h-full flex items-center justify-center animate-pulse text-green-800 text-[10px] uppercase tracking-widest">
                    Sincronizando...
                  </div>
                ) : msg.image ? (
                  <img 
                    src={msg.image} 
                    alt="Visual Feed" 
                    className="w-full h-full object-cover pixelated animate-in fade-in zoom-in duration-700"
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
      <form onSubmit={handleSubmit} className="p-3 md:p-4 bg-green-900/10 border-t border-green-900/50">
        <div className="flex justify-end mb-1">
          <span className={`text-[10px] font-bold uppercase transition-colors ${
            wordCount >= maxWords ? 'text-red-500 animate-pulse' : 'text-green-500'
          }`}>
            {wordCount >= maxWords ? 'Límite alcanzado' : `Palabras: ${wordCount}/${maxWords}`}
          </span>
        </div>

        <div className="flex gap-2 md:gap-3 items-center">
          <span className="text-green-500 mb-2 font-bold hidden sm:inline">{'>'}</span>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder={wordCount >= maxWords ? "Límite alcanzado..." : "Escribe tu acción..."}
            className="flex-1 bg-transparent border-none outline-none text-green-500 text-sm md:text-base resize-none py-2 px-1 font-mono leading-tight custom-terminal-scroll"            
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
            disabled={isLoading || !input.trim() || wordCount > maxWords}
            className="px-3 md:px-5 py-2 h-10 bg-green-900/30 text-green-500 border border-green-700/50 hover:bg-green-800/40 disabled:opacity-20 uppercase text-[10px] md:text-xs font-bold active:bg-green-700"
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