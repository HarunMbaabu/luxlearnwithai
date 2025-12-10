"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Sparkles,
  RefreshCw,
  Clipboard,
  Check,
  Trash2,
  BrainCircuit,
  Code,
  BarChart3,
  Database,
  MessageSquare,
  Plus,
  Edit2,
  Search,
  X,
  Settings,
} from "lucide-react";
import Header from "../components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatAIResponse } from "@/utils/formatAIResponse";
import { AuroraText } from "@/components/magicui/aurora-text";
import Link from "next/link";

// Sample suggested questions
const suggestedQuestions = [
  "How do I start learning data science?",
  "What programming languages should I learn for AI?",
  "Can you explain machine learning in simple terms?",
  "What are the best resources for learning Python?",
  "How do I prepare for a data science interview?",
  "What's the difference between AI and machine learning?",
];

export default function AskAIPage() {
  // Generate a persistent user ID for this session
  const [userId] = useState(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      // Try to get existing ID from localStorage
      const existingId = localStorage.getItem("luxdev_user_id");
      if (existingId) return existingId;

      // Generate new ID if none exists
      const newId = uuidv4();
      localStorage.setItem("luxdev_user_id", newId);
      return newId;
    }
    return uuidv4(); // Fallback for SSR
  });

  // Initialize chats from localStorage or with default
  const [chats, setChats] = useState(() => {
    if (typeof window !== "undefined") {
      const savedChats = localStorage.getItem("luxdev_chats");
      if (savedChats) {
        try {
          // Parse dates properly
          const parsedChats = JSON.parse(savedChats, (key, value) => {
            if (key === "timestamp" || key === "lastUpdated") {
              return new Date(value);
            }
            return value;
          });
          return parsedChats;
        } catch (e) {
          console.error("Error parsing saved chats:", e);
        }
      }
    }

    // Default chat
    return [
      {
        id: uuidv4(),
        title: "New Chat",
        lastUpdated: new Date(),
        preview: "Hi there! I'm LuxIQ.",
        messages: [
          {
            id: uuidv4(),
            role: "assistant",
            content:
              "Hi there! I'm LuxIQ. How can I help you with your data science and AI learning journey today?",
            timestamp: new Date(),
          },
        ],
      },
    ];
  });

  const [activeChat, setActiveChat] = useState(chats[0]?.id || "");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(null);
  const [editTitleValue, setEditTitleValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const editTitleInputRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  // Save chats to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("luxdev_chats", JSON.stringify(chats));
    }
  }, [chats]);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeChat]);

  // Focus edit title input when editing
  useEffect(() => {
    if (isEditingTitle && editTitleInputRef.current) {
      editTitleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  // Get current active chat
  const currentChat = chats.find((chat) => chat.id === activeChat) || chats[0];

  // Function to create a new chat
  const createNewChat = () => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      title: "New Chat",
      lastUpdated: new Date(),
      preview: "Hi there! I'm LuxIQ.",
      messages: [
        {
          id: uuidv4(),
          role: "assistant",
          content:
            "Hi there! I'm LuxIQ. How can I help you with your data science and AI learning journey today?",
          timestamp: new Date(),
        },
      ],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChatId);
    setShowSuggestions(true);
    setIsMobileSidebarOpen(false);
  };

  // Function to send message to API
  const sendMessage = async (messageContent) => {
    if (!messageContent.trim() || !currentChat) return;

    // Add user message to state
    const userMessage = {
      id: uuidv4(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    // Update chat with user message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              lastUpdated: new Date(),
              // If this is the first user message, update the title
              title:
                chat.title === "New Chat" && chat.messages.length === 1
                  ? messageContent.slice(0, 30) +
                    (messageContent.length > 30 ? "..." : "")
                  : chat.title,
              preview: messageContent,
            }
          : chat
      )
    );

    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      // Send message to API using the provided implementation
      const response = await fetch("https://api.luxdevhq.ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId, // Using our userId as user_id
          message: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to state
      const aiMessage = {
        id: uuidv4(),
        role: "assistant",
        content: data.message || "I'm sorry, I couldn't process your request.", // Using data.message instead of data.response
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, aiMessage],
                lastUpdated: new Date(),
                preview: `${messageContent.slice(0, 20)}${
                  messageContent.length > 20 ? "..." : ""
                }`,
              }
            : chat
        )
      );
    } catch (err) {
      console.error("Error sending message:", err);
      setError(
        "Sorry, there was an error communicating with the AI. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Add a helper function to clean responses if needed
  const cleanResponse = (text) => {
    // This function can be expanded based on what cleaning is needed
    return text || "";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    sendMessage(question);
    setShowSuggestions(false);
  };

  // Handle copy to clipboard
  const copyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Clear current chat
  const clearCurrentChat = () => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              title: "New Chat",
              lastUpdated: new Date(),
              preview: "Hi there! I'm LuxIQ.",
              messages: [
                {
                  id: uuidv4(),
                  role: "assistant",
                  content:
                    "Hi there! I'm LuxIQ. How can I help you with your data science and AI learning journey today?",
                  timestamp: new Date(),
                },
              ],
            }
          : chat
      )
    );
    setShowSuggestions(true);
  };

  // Delete a chat
  const deleteChat = (chatId, e) => {
    e.stopPropagation();

    setChats((prev) => {
      const filtered = prev.filter((chat) => chat.id !== chatId);

      // If we're deleting the active chat, set a new active chat
      if (chatId === activeChat && filtered.length > 0) {
        setActiveChat(filtered[0].id);
      } else if (filtered.length === 0) {
        // If we deleted the last chat, create a new one
        const newChatId = uuidv4();
        const newChat = {
          id: newChatId,
          title: "New Chat",
          lastUpdated: new Date(),
          preview: "Hi there! I'm LuxIQ.",
          messages: [
            {
              id: uuidv4(),
              role: "assistant",
              content:
                "Hi there! I'm LuxIQ. How can I help you with your data science and AI learning journey today?",
              timestamp: new Date(),
            },
          ],
        };
        setActiveChat(newChatId);
        return [newChat];
      }

      return filtered;
    });
  };

  // Start editing a chat title
  const startEditingTitle = (chatId, currentTitle, e) => {
    e.stopPropagation();
    setIsEditingTitle(chatId);
    setEditTitleValue(currentTitle);
  };

  // Save edited chat title
  const saveEditedTitle = (chatId) => {
    if (editTitleValue.trim()) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, title: editTitleValue.trim() } : chat
        )
      );
    }
    setIsEditingTitle(null);
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date for chat list
  const formatDate = (date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Filter chats based on search query
  const filteredChats = searchQuery
    ? chats.filter(
        (chat) =>
          chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.messages.some((msg) =>
            msg.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : chats;

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-16">
        <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
          {/* Chat Sidebar - Desktop */}
          <div className="w-80 border-r border-gray-200 h-full hidden md:flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <Button
                onClick={createNewChat}
                className="w-full bg-blue-900 hover:bg-blue-800"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>

              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search chats..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-grow overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No chats found
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      chat.id === activeChat ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setActiveChat(chat.id);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3 flex-grow overflow-hidden">
                        <MessageSquare className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                        <div className="flex-grow min-w-0">
                          {isEditingTitle === chat.id ? (
                            <div className="flex items-center">
                              <Input
                                ref={editTitleInputRef}
                                value={editTitleValue}
                                onChange={(e) =>
                                  setEditTitleValue(e.target.value)
                                }
                                className="text-sm h-7 py-1"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    saveEditedTitle(chat.id);
                                  } else if (e.key === "Escape") {
                                    setIsEditingTitle(null);
                                  }
                                }}
                                onBlur={() => saveEditedTitle(chat.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          ) : (
                            <h3 className="font-medium text-sm truncate">
                              {chat.title}
                            </h3>
                          )}
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {chat.preview}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center ml-2">
                        {!isEditingTitle && (
                          <>
                            <button
                              className="text-gray-400 hover:text-gray-600 p-1"
                              onClick={(e) =>
                                startEditingTitle(chat.id, chat.title, e)
                              }
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                            <button
                              className="text-gray-400 hover:text-red-600 p-1"
                              onClick={(e) => deleteChat(chat.id, e)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDate(chat.lastUpdated)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback className="bg-gray-200">U</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="text-sm font-medium truncate">LuxDev Student</p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Toggle */}
          <div className="md:hidden fixed bottom-32 left-2 z-20">
            <Button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-full h-10 w-10 bg-blue-900 shadow-lg flex items-center justify-center"
              size="icon"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${
              isMobileSidebarOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsMobileSidebarOpen(false)}
            ></div>

            <div
              className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-xl flex flex-col transition-transform duration-300 ${
                isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-bold text-lg">Your Chats</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 border-b border-gray-200">
                <Button
                  onClick={createNewChat}
                  className="w-full bg-blue-900 hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>

                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search chats..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-grow overflow-y-auto">
                {filteredChats.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No chats found
                  </div>
                ) : (
                  filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        chat.id === activeChat ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setActiveChat(chat.id);
                        setIsMobileSidebarOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3 flex-grow overflow-hidden">
                          <MessageSquare className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                          <div className="flex-grow min-w-0">
                            {isEditingTitle === chat.id ? (
                              <div className="flex items-center">
                                <Input
                                  value={editTitleValue}
                                  onChange={(e) =>
                                    setEditTitleValue(e.target.value)
                                  }
                                  className="text-sm h-7 py-1"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      saveEditedTitle(chat.id);
                                    } else if (e.key === "Escape") {
                                      setIsEditingTitle(null);
                                    }
                                  }}
                                  onBlur={() => saveEditedTitle(chat.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            ) : (
                              <h3 className="font-medium text-sm truncate">
                                {chat.title}
                              </h3>
                            )}
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {chat.preview}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center ml-2">
                          {!isEditingTitle && (
                            <>
                              <button
                                className="text-gray-400 hover:text-gray-600 p-1"
                                onClick={(e) =>
                                  startEditingTitle(chat.id, chat.title, e)
                                }
                              >
                                <Edit2 className="h-3 w-3" />
                              </button>
                              <button
                                className="text-gray-400 hover:text-red-600 p-1"
                                onClick={(e) => deleteChat(chat.id, e)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {formatDate(chat.lastUpdated)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                    />
                    <AvatarFallback className="bg-gray-200">U</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-medium truncate">
                      LuxDev Student
                    </p>
                    <p className="text-xs text-gray-500">Free Plan</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-grow flex flex-col h-full overflow-hidden">
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="AI"
                  />
                  <AvatarFallback className="bg-blue-900 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold">LuxIQ</h2>
                  <p className="text-xs text-gray-500">
                    Specialized in data science & AI
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCurrentChat}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Clear Chat</span>
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-grow overflow-y-auto p-2 sm:p-4">
              {currentChat?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[90%] sm:max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar
                      className={`h-8 w-8 ${
                        message.role === "user" ? "ml-3" : "mr-3"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="AI"
                          />
                          <AvatarFallback className="bg-blue-900 text-white">
                            AI
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="User"
                          />
                          <AvatarFallback className="bg-gray-200">
                            U
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "assistant"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-900 text-white"
                        }`}
                      >
                        <div className="whitespace-pre-wrap break-words text-sm sm:text-base">
                          {formatAIResponse(message.content)}
                        </div>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{formatTime(message.timestamp)}</span>
                        {message.role === "assistant" && (
                          <button
                            onClick={() =>
                              copyToClipboard(
                                formatAIResponse(message.content),
                                message.id
                              )
                            }
                            className="ml-2 p-1 hover:text-blue-900 transition-colors"
                            aria-label="Copy to clipboard"
                          >
                            {copiedMessageId === message.id ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Clipboard className="h-3 w-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="AI"
                      />
                      <AvatarFallback className="bg-blue-900 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-gray-100 p-3 flex items-center">
                      <AuroraText speed={10}>is Thinking...</AuroraText>
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex justify-center mb-4">
                  <div className="bg-red-50 text-red-800 px-4 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {showSuggestions && currentChat?.messages.length <= 1 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Suggested questions:
                  </h3>
                  <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2">
                    {suggestedQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 transition-colors py-2"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Anchor for scrolling to bottom */}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Form */}
            <div className="p-3 sm:p-4 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="relative">
                  <Textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="pr-12 min-h-[60px] sm:min-h-[80px] text-base resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-2 bottom-2 bg-blue-900 h-10 w-10"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for a new line
                </p>
              </form>
            </div>
          </div>

          {/* Info Sidebar - Desktop */}
          <div className=" w-4/5 border-l border-gray-200 h-full hidden lg:block overflow-y-auto py-6">
            <Tabs defaultValue="topics" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white z-10">
                <TabsTrigger value="topics">Topics</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <TabsContent value="topics" className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <BrainCircuit className="h-4 w-4 text-blue-900 mr-2" />
                      Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "What is the best roadmap to mastering AI Engineering, from foundational concepts to real-world applications?"
                          )
                        }
                      >
                        AI Engineering
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion("What is the most effective roadmap for becoming a proficient Data Scientist?")
                        }
                      >
                        Data Science
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion("Can you provide the LuxDevHQ Data Engineering roadmap?")
                        }
                      >
                        Data Engineering
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion("Can you provide the LuxDevHQ Data Analytics roadmap?")
                        }
                      >
                        Data Analytics
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Code className="h-4 w-4 text-blue-900 mr-2" />
                      Programming
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "What is Python and how is it used in Data Science? Please provide examples."
                          )
                        }
                      >
                        Python
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "What is SQL?, how is it used in Data Analytics? Give examples and applications."
                          )
                        }
                      >
                        SQL
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "Scala for data engineering and data science."
                          )
                        }
                      >
                        Scala
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "R vs Python for data analysis"
                          )
                        }
                      >
                        R Lang
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Database className="h-4 w-4 text-blue-900 mr-2" />
                      Explore
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion("What is the most effective roadmap for learning Apache Airflow for Beginners?")
                        }
                      >
                        Apache Airflow
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "What is the most effective roadmap for becoming a skilled Analytical Engineer?"
                          )
                        }
                      >
                        Analytical Engineering
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion("What is the best roadmap for learning Kafka?")
                        }
                      >
                        Kafka
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion("Data warehousing concepts")
                        }
                      >
                        Data Warehousing
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <BarChart3 className="h-4 w-4 text-blue-900 mr-2" />
                      Trends
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion("MCP 101: An Introduction to Model Context Protocol")
                        }
                      >
                        What is MCP?
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "What is AI Factory and how does it work?"
                          )
                        }
                      >
                        AI Factories
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "How can I develop a comprehensive understanding of Multimodal AI, including its principles, applications, and future trends?"
                          )
                        }
                      >
                        Multimodal AI
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleSuggestedQuestion(
                            "Explain the concept of Agentic AI and its implications for the future."
                          )
                        }
                      >
                        Agentic AI
                      </Badge>
                    </div>
                  </div>
                </div>
                <Card className="mt-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Apply for Our Courses
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Expand your skills with our specialized training programs
                      and expert-led courses.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm text-blue-100">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          Hands-on projects with personalized feedback
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Learn from industry professionals</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Flexible scheduling options available</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-900 hover:bg-blue-50">
                      <Link href={process.env.NEXT_PUBLIC_REGISTRATION_LINK || '#'}>Register for January 2026 Intake</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="about" className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 text-blue-900 mr-2" />
                      Capabilities
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Answer data science & AI questions</li>
                      <li>• Explain complex concepts simply</li>
                      <li>• Recommend learning resources</li>
                      <li>• Help with coding problems</li>
                      <li>• Provide career guidance</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <RefreshCw className="h-4 w-4 text-blue-900 mr-2" />
                      Limitations
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• May not have latest information</li>
                      <li>• Cannot access external websites</li>
                      <li>• Cannot run code or debug in real-time</li>
                      <li>• Limited to text responses</li>
                    </ul>
                  </div>
                </div>

                {/* Premium Upgrade Card
                <Card className="mt-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Upgrade to AI Premium
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Get advanced AI features, longer context memory, and
                      priority response times.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm text-blue-100">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Code analysis and debugging assistance</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Personalized learning recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Project idea generation and guidance</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-900 hover:bg-blue-50">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card> */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
