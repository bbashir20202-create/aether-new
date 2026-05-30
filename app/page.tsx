'use client';

import { useState, useRef, useEffect } from 'react';

export default function Aether() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello Boss. I'm Aether — your personal AI agent with memory.\n\nI can help you with business ideas, research, planning, analysis, and more.\n\nWhat would you like to do today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || "I received your message." }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting to my brain. Please try again." 
      }]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-violet-400 mb-2">Aether</h1>
          <p className="text-zinc-400">Your Personal Cloud Agent • Memory Enabled</p>
        </div>

        <div ref={chatRef} className="h-[70vh] overflow-y-auto bg-zinc-900 rounded-3xl p-6 mb-6 space-y-6 border border-zinc-800">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-zinc-800 text-zinc-100'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-violet-400 italic">Aether is thinking...</div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your command here... (e.g. Research scrap metal market in Pakistan)"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-violet-600 hover:bg-violet-700 px-8 rounded-2xl font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
