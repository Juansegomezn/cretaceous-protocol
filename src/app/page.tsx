'use client';
import GameConsole from "./components/GameConsole";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] p-4 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <GameConsole />
      </div>

      <footer className="mt-8 text-green-900 text-[10px] uppercase tracking-widest font-mono">
        Conexión Segura // Nodo: 0x234-A // Creataceous Protocol
      </footer>
    </main>
  );
}