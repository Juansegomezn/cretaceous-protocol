import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ResetModal = ({ isOpen, onClose, onConfirm, title, message }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md border-2 border-red-900 bg-gray-950 p-6 shadow-[0_0_20px_rgba(153,27,27,0.4)] relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            <h2 className="text-red-600 font-mono text-xl mb-4 tracking-tighter uppercase font-bold italic">
              {`> ${title}`}
            </h2>
            
            <p className="text-red-700 font-mono text-sm mb-8 leading-relaxed">
              {message}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end font-mono mt-4">
              <button 
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 text-red-900 border border-red-900/30 hover:bg-red-900/10 uppercase text-xs"
              >
                [ Cancelar ]
              </button>
              <button 
                onClick={onConfirm}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-red-900 text-black font-bold hover:bg-red-700 uppercase text-xs"
              >
                Confirmar Reinicio
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};