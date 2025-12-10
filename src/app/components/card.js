"use client";
import Image from "next/image";
import DynamicInput from "./input";
import { useRef, useState } from "react";
import { BookOpen, Sparkles, Users, Mic, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LuxDevHQCard() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleAskButtonClick = (e) => {
    if (inputRef.current) {
      inputRef.current.handleSubmit();
    }
  };

  const handleInputChange = (value) => {
    setInput(value || "");
  };

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div>
          <div className="rounded-2xl p-4 border overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <Image
                src="/logo.png"
                alt="LuxDevHQ"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            </div>

            <div className="flex flex-row items-center">
              <div className="w-full">
                <DynamicInput
                  ref={inputRef}
                  onChange={handleInputChange}
                  className="text-gray-700 p-0 py-4 shadow-none bg-transparent border-0 placeholder-gray-400 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <Button
                size="icon"
                className="h-6 w-6 rounded-lg shadow-none bg-blue-950 text-gray-400 p-4 overflow-hidden relative"
                onClick={handleAskButtonClick}
                disabled={loading}
              >
                <AnimatePresence mode="wait">
                  {input && typeof input === "string" && input.trim() ? (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Send className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="mic"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Mic className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-2 overflow-x-auto scrollbar-hide">
              <Button
                variant="ghost"
                className="h-6 px-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs flex items-center gap-1"
              >
                <Sparkles className="h-4 w-4 mr-2 text-teal-500" />
                Explore Data Science Path
              </Button>
              <Button
                variant="ghost"
                className="h-6 px-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs flex items-center gap-1"
              >
                <BookOpen className="h-4 w-4 mr-2 text-teal-500" />
                Start with Python Basics
              </Button>
              <Button
                variant="ghost"
                className="h-6 px-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs flex items-center gap-1"
              >
                <Users className="h-4 w-4 mr-2 text-teal-500" />
                Join our Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
