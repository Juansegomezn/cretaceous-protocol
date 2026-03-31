import { GameMessage, GenerateStoryResponse } from "@/lib/types";
import { useState, useEffect } from "react";


export function useGame() {
  const [messages, setMessages] = useState<GameMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedProgress = localStorage.getItem('cretaceous_progress');
    if (savedProgress) {
      setMessages(JSON.parse(savedProgress));
    } else {
      startGame();
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('cretaceous_progress', JSON.stringify(messages));
    }
  }, [messages]);

  const startGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('api/generate-story', {
        method: 'POST', 
        body: JSON.stringify({ isNewGame: true })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const messageId = `msg-${Date.now()}`;
      const newMessage: GameMessage = {
        id: messageId,
        role: 'assistant',
        content: data.story,
        imageLoading: true
      };

      setMessages([newMessage]);
      generateImage(data.imagePrompt.description, messageId);
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const resetGame = () => {
    if (confirm("¿Confirmar reinicio del Protocolo? Se perderán todos los datos del sector actual.")) {
      localStorage.removeItem('cretaceous_progress');
      setMessages([]);
      startGame();
    }
  };

  const generateImage = async (imagePrompt: string, messageId: string) => {
    try {
      const response = await fetch('api/generate-image', {
        method: 'POST', 
        body: JSON.stringify({
          imagePrompt
        })
      }) 

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const imageData = await response.json();

      setMessages((prevMessages) => {
        return prevMessages.map((message) => {
          if (message.id === messageId) {
            return {
              ...message,
              image: imageData.image,
              imageLoading: false
            };
          }
          return message;
        })
      }) 
    } catch (error) {
      console.error('Error generating image:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return

    const userMessage: GameMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input
    }

    setIsLoading(true)
    setInput('')
    setMessages(prevMessages => [...prevMessages, userMessage])

    try {
      const response = await fetch('api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          userMessage: input,
          conversationStory: messages.map(({ role, content }) => ({ role, content })),
          isNewGame: false
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as GenerateStoryResponse
      
      const messageId = crypto.randomUUID()

      const assistantMessage: GameMessage = {
        id: messageId,
        role: 'assistant',
        content: data.story,
        imageLoading: true
      }

      setMessages(prevMessages => [...prevMessages, assistantMessage])
      generateImage(data.imagePrompt.description, messageId);
    } catch (error) {
      console.error('Error submitting user message:', error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return { messages, input, isLoading, setInput, handleSubmit, handleInputChange, resetGame };
}