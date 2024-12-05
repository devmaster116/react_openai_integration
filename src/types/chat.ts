export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}