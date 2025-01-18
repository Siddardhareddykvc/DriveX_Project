import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { Chat } from './components/Chat';
import { parseExcel } from './utils/excel';
import { Bot } from 'lucide-react';
import type { Message, DocumentData, ChatResponse } from './types';

const OPENAI_API_KEY = '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';

function App() {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedContent, setParsedContent] = useState<string>('');

  const handleFileUpload = useCallback(async (file: DocumentData) => {
    try {
      const content = await parseExcel(new File([file.content], file.name, { type: file.type }));
      setDocument({ ...file, content: file.content });
      setParsedContent(content);
      setMessages([
        {
          role: 'system',
          content: 'Document uploaded successfully. You can now ask questions about its content.',
        },
      ]);
    } catch (error) {
      console.error('Error parsing file:', error);
      setMessages([
        {
          role: 'system',
          content: error instanceof Error ? error.message : 'Error parsing the document. Please try again with a valid Excel file.',
        },
      ]);
      setDocument(null);
      setParsedContent('');
    }
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!document || !parsedContent) return;

    setIsLoading(true);
    const newMessages = [
      ...messages,
      { role: 'user', content } as Message,
    ];
    setMessages(newMessages);

    try {
      const systemPrompt = `You are an AI assistant analyzing an Excel document. Answer questions based on this data: ${parsedContent}

Instructions:
1. Provide clear, concise answers based only on the data provided
2. If the answer cannot be found in the data, say so
3. For numerical questions, include specific numbers from the data
4. Format currency values appropriately
5. If asked about trends or patterns, analyze the data accordingly

Current question: ${content}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            ...newMessages.map(msg => ({
              role: msg.role === 'system' ? 'assistant' : msg.role,
              content: msg.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to get response from AI. Please try again.');
      }

      const data: ChatResponse = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from AI. Please try again.');
      }

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: data.choices[0].message.content,
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: error instanceof Error 
            ? `Error: ${error.message}. Please try again or rephrase your question.` 
            : 'Sorry, I encountered an error while processing your request. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bot className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Document Q&A Assistant</h1>
          </div>
          <p className="text-lg text-gray-600">
            Upload your Excel document and ask questions about its content
          </p>
        </div>

        {!document ? (
          <FileUpload onFileUpload={handleFileUpload} />
        ) : (
          <div className="grid grid-cols-1 gap-8 h-[600px]">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {document.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {(document.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDocument(null);
                    setParsedContent('');
                    setMessages([]);
                  }}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;