"use client";

import { useState } from "react";
import {
  Send,
  ChevronRight,
  BarChart2,
  Database,
  LineChart,
  BrainCircuit,
} from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat
    setIsLoading(true);

    try {
      const response = await fetch("https://api.bettercallpaul.world/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "12345", // Replace with dynamic user_id if available
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: cleanResponse(data.message),
      };

      setMessages((prev) => [...prev, aiMessage]); // Add AI response
      setInput(""); // Clear input field
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 -ml-64"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md flex items-center justify-center">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">LuxDevHQ</h1>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">
            LEARNING PATHS
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <Database className="h-4 w-4 mr-2 text-indigo-600" />
                SQL Fundamentals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <BarChart2 className="h-4 w-4 mr-2 text-indigo-600" />
                Data Visualization
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <LineChart className="h-4 w-4 mr-2 text-indigo-600" />
                Machine Learning
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2 p-2 rounded-md hover:bg-gray-100"
            >
              <ChevronRight
                className={`h-5 w-5 transition-transform ${
                  sidebarOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <h2 className="text-lg font-semibold">Data Science Assistant</h2>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Learn Data Science and level up with LuxDevHQ
              </h2>
              <p className="text-gray-600 max-w-md mb-6">
                Ask questions about data science concepts, get help with code,
                or explore new techniques to enhance your skills.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-start max-w-[80%]">
                    {message.role !== "user" && (
                      <div className="size-8 aspect-square mr-2 mt-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                        AI
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-white border border-gray-200 rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === "user" && (
                      <div className="size-8 aspect-square ml-2 mt-1 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        ME
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start max-w-[80%]">
                    <div className="h-8 w-8 mr-2 mt-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                      AI
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form
            onSubmit={handleSubmit}
            className="flex space-x-2 max-w-3xl mx-auto"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about data science concepts, code help, or learning resources..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function cleanResponse(text) {
  if (typeof text !== "string") {
    console.error("Error: Input is not a string");
    return "";
  }

  return text
    .replace(/\d+\.\s\*\*(.*?)\*\*/g, "\n\n<h3>$1</h3>") // Numbered bold text on new line
    .replace(/\*\*(.*?)\*\*/g, "\n\n<h3>$1</h3>") // Ensure bold words are on a separate line
    .replace(/\n{3,}/g, "\n\n") // Prevent excessive new lines
    .replace(/\s+/g, " ") // Normalize spaces
    .trim()
    .split(/\n\n/) // Ensure correct JSX formatting
    .map((part, index) =>
      part.startsWith("<h3>") ? (
        <h3 key={index} dangerouslySetInnerHTML={{ __html: part }} />
      ) : (
        <p key={index} dangerouslySetInnerHTML={{ __html: part }} />
      )
    );
}
