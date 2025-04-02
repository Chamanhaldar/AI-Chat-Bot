import { useState } from "react";
import React from "react";
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
      <div className="min-h-screen flex flex-col items-center p-4 max-w-3xl mx-auto">
        <h1 className="mt-10 bg-gray-500 text-white font-bold text-2xl rounded-2xl p-6 w-full text-center shadow-md">
          Chat AI
        </h1>
        <div className="flex items-center mt-5 w-full p-4 bg-gray-100 rounded-2xl shadow-md">
          <input
            type="text"
            placeholder="Ask anything to AI..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 p-2 text-lg text-gray-800 bg-transparent outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateAnswer}
            className="ml-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
          >
            <Send size={15} />
          </button>
        </div>
        <pre className="mt-5 p-4 bg-white rounded-lg text-gray-800 text-lg shadow-md w-full whitespace-pre-wrap break-words">
          {answer}
        </pre>
      </div>
    </>
  );
}

export default App;
