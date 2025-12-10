"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const DynamicInput = forwardRef((props, ref) => {
  const placeholders = [
    "Empowering the future with AI and Data Science.",
    "Building tech skills for real-world impact.",
    "Explore immersive tech training with LuxDevHQ.",
    "Your next career step starts with LuxDevHQ.",
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Dynamic placeholder typing effect
  useEffect(() => {
    const typeEffect = setInterval(() => {
      if (charIndex < placeholders[index].length) {
        setPlaceholder((prev) => prev + placeholders[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(typeEffect);
        setTimeout(() => {
          setCharIndex(0);
          setPlaceholder("");
          setIndex((prev) => (prev + 1) % placeholders.length);
        }, 2000);
      }
    }, 100);
    return () => clearInterval(typeEffect);
  }, [charIndex, index]);

  // Update parent component's state when message changes
  useEffect(() => {
    if (props.onChange) {
      props.onChange(message);
    }
  }, [message, props.onChange]);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const userId = localStorage.getItem("userId") || generateUserId();

      const response = await fetch("https://api.bettercallpaul.world/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail
            ? JSON.stringify(errorData.detail)
            : "Failed to send message"
        );
      }

      const data = await response.json();
      setResponse(data.message);
      setMessage("");

      if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", userId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
    getValue: () => message,
  }));

  const generateUserId = () => {
    return "user_" + Math.random().toString(36).substring(2, 15);
  };

  return (
    <div className="relative w-full">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className={`${props.className} w-full outline-0 resize-none scrollbar-hide`}
        rows="1"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
    </div>
  );
});

DynamicInput.displayName = "DynamicInput";

export default DynamicInput;
