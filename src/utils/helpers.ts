import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/chat';

export function createMessage(text: string, isUser: boolean): Message {
  return {
    id: uuidv4(),
    text,
    isUser,
    timestamp: new Date().toISOString(),
  };
}

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString();
}