import { useState } from "react";
import React from 'react'
import "./App.css";
import axios from "axios";
import { Send } from "lucide-react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAVFbZADgfeNHGPFLfZl7grnCfNOYgSj4E",
      method: "post",
      data: {
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      },
    });
    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }

  return (
    <>
      <h1 className="mt-10 bg-gray-500 font-bold rounded-2xl p-6">Chat AI</h1>
      <div className="flex items-center mt-5 w-full mx-auto p-4 bg-gray-100 rounded-2xl shadow-md">
        <input
          type="text"
          placeholder="Ask anything to AI..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-1.5 text-lg text-black bg-transparent outline-none"
        />
        <button
          onClick={generateAnswer}
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
        >
          <Send size={15} />
        </button>
      </div>
      <pre className=" p-3 rounded-lg text-gray-800 break-words overflow-hidden max-w-full whitespace-pre-wrap">{answer}</pre>
    </>
  );
}

export default App;
