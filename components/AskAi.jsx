'use client';
import { useState } from 'react';

export default function AskAI() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleask = async () => {
    if (!question.trim()) return;

    setLoading(true);
    const userMessage = { type: 'user', text: question };
    setChatHistory((prev) => [...prev, userMessage]);

    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    const botMessage = { type: 'bot', text: data.answer || 'Error' };

    setChatHistory((prev) => [...prev, botMessage]);
    setQuestion('');
    setLoading(false);
  };

  

  return (
    <div className="p-6  mx-auto h-140 flex flex-col bg-orange-100 mt-0 w-150">
      <h1 className="text-2xl font-bold mb-4 text-center">Ask AI</h1>

      
      <div
        className="flex-1 overflow-y-auto bg-white rounded shadow p-4 mb-4 max-h-110"
       
      >
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 my-2 rounded max-w-[70%] ${
              msg.type === 'user'
                ? 'ml-auto bg-red-200 text-right '
                : 'mr-auto bg-orange-200 text-left'
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
       
      </div>

     
      <div className="flex gap-2">
        <textarea
          className="flex-grow p-2 border rounded"
          placeholder="Ask a legal question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
        />
        <button
          onClick={handleask}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 rounded hover:scale-110 transition-transform duration-300"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
    </div>
  );
}