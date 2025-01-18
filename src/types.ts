export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export interface DocumentData {
  content: ArrayBuffer;
  name: string;
  type: string;
  size: number;
}