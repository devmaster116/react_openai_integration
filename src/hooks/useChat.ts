import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/chat';
import { sendChatMessage } from '../services/api';
import { isAPIError } from '../services/errors';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      text: text.trim(),
      sender: 'You',
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(text);
      
      const aiMessage: Message = {
        id: uuidv4(),
        text: response.response,
        sender: 'ZADI',
        isUser: false,
        timestamp: response.timestamp,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      
      const errorMessage = isAPIError(err) 
        ? err.message 
        : 'Failed to send message. Please try again.';
      
      setError(errorMessage);
      
      const chatErrorMessage: Message = {
        id: uuidv4(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ZADI',
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, chatErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, error, sendMessage };
}