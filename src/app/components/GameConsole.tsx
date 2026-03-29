'use client';
import { useGame } from "../hooks/useGame";
import { useEffect, useRef } from "react";

export default function GameConsole() {
  const { messages, input, isLoading, handleSubmit, handleInputChange } = useGame();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-[90vh] max-w-4xl mx-auto bg-black border-2 border-green-900/50 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.2)] overflow-hidden font-mono">
      {/* System Header */}
      <div className="bg-green-900/20 p-2 border-b border-green-900/50 flex justify-between text-xs text-green-500">
        <span>SISTEMA: CRETACEOUS_PROTOCOL_V1.0</span>
        <span className="animate-pulse">● EN LINEA</span>
      </div>
      {/* Messages Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {/* Text Bubble */}
            <div className={`max-w-[80%] p-4 rounded-lg ${
              msg.role === 'user' 
              ? 'bg-green-900/30 text-green-100 border border-green-700/50' 
              : 'bg-slate-900/50 text-green-400 border border-slate-700/50'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">
                {msg.role === 'user' ? `> ${msg.content}` : msg.content}
              </p>
            </div>
            {/* Async Image Rendering */}
            {msg.role === 'assistant' && (
              <div className="mt-4 w-full max-w-lg aspect-video rounded border-2 border-green-900/30 overflow-hidden bg-slate-950">
                {msg.imageLoading ? (
                  <div className="h-full flex items-center justify-center animate-pulse text-green-800 text-sm">
                    RECONSTRUYENDO SEÑAL VISUAL...
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
      <form onSubmit={handleSubmit} className="p-4 bg-green-900/10 border-t border-green-900/50">
        <div className="flex gap-3">
          <span className="text-green-500 py-2">{'>'}</span>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Introduce comando de acción..."
            className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder:text-green-900 resize-none py-2"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-green-900/40 text-green-500 border border-green-700 hover:bg-green-800/50 disabled:opacity-30 transition-all uppercase text-xs font-bold"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}