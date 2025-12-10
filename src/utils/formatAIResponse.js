import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DOMPurify from "isomorphic-dompurify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";

// Enhanced AI response formatter with improved responsiveness for small screens
export const AIResponseFormatter = ({ 
  text, 
  isStreaming = false,
  theme = "dark",
  enableCopy = true,
  animationSpeed = 30,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(!isStreaming);
  const streamTimerRef = useRef(null);
  const codeCopyTimeoutsRef = useRef([]);
  
  // Theme configuration
  const themeConfig = {
    dark: {
      codeStyle: vscDarkPlus,
      inlineCodeClass: "bg-gray-700 text-gray-100",
      linkClass: "text-blue-400 hover:text-blue-300",
    },
    light: {
      codeStyle: vs,
      inlineCodeClass: "bg-gray-200 text-gray-800",
      linkClass: "text-blue-600 hover:text-blue-800",
    }
  }[theme] || themeConfig.dark;

  // Clean and sanitize the incoming text
  // Normalize whitespace in the text before processing
  const sanitizedText = text ? DOMPurify.sanitize(normalizeWhitespace(text)) : "";

  // Normalize whitespace function to fix excessive newlines
  function normalizeWhitespace(text) {
    if (!text) return "";
    
    // Preserve code blocks
    const codeBlocks = [];
    const codeBlockRegex = /```[\s\S]*?```/g;
    
    // Replace code blocks with placeholders
    const textWithoutCode = text.replace(codeBlockRegex, match => {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match);
      return placeholder;
    });
    
    // Normalize whitespace in non-code parts
    let normalized = textWithoutCode
      // Convert multiple blank lines to a single blank line
      .replace(/\n\s*\n\s*\n+/g, '\n\n')
      // Fix spacing around list items (keep the exact spacing required for markdown lists)
      .replace(/\n\s*(\d+\.|\*|\-)\s/g, '\n$1 ');
      
    // Restore code blocks
    codeBlocks.forEach((block, i) => {
      normalized = normalized.replace(`__CODE_BLOCK_${i}__`, block);
    });
    
    return normalized;
  }

  // Stream text character by character for a more natural typing effect
  useEffect(() => {
    if (isStreaming && sanitizedText) {
      let index = 0;
      const tokens = tokenizeWithCodeBlocks(sanitizedText);
      setDisplayText("");

      const streamNextToken = () => {
        if (index < tokens.length) {
          setDisplayText(prev => prev + tokens[index]);
          index++;
          streamTimerRef.current = setTimeout(streamNextToken, animationSpeed);
        } else {
          setIsComplete(true);
        }
      };

      streamTimerRef.current = setTimeout(streamNextToken, 0);

      return () => {
        if (streamTimerRef.current) {
          clearTimeout(streamTimerRef.current);
        }
      };
    } else {
      setDisplayText(sanitizedText);
      setIsComplete(true);
    }
  }, [sanitizedText, isStreaming, animationSpeed]);

  // Clean up any remaining timeouts on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) {
        clearTimeout(streamTimerRef.current);
      }
      codeCopyTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Tokenize text, preserving code blocks 
  const tokenizeWithCodeBlocks = (text) => {
    const codeBlockRegex = /```[\s\S]*?```/g;
    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add characters before code block
      if (match.index > lastIndex) {
        segments.push(...text.substring(lastIndex, match.index).split(''));
      }
      
      // Add entire code block as a single token
      segments.push(match[0]);
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining characters
    if (lastIndex < text.length) {
      segments.push(...text.substring(lastIndex).split(''));
    }
    
    return segments;
  };

  // Copy code to clipboard with responsive button styling
  const handleCopyCode = (code, buttonRef) => {
    navigator.clipboard.writeText(code).then(() => {
      if (buttonRef.current) {
        buttonRef.current.innerText = "✓";
        const timeout = setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.innerText = "Copy";
          }
        }, 2000);
        codeCopyTimeoutsRef.current.push(timeout);
      }
    });
  };

  // Custom Code block renderer with responsive copy button
  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const buttonRef = useRef(null);
    const codeContainerRef = useRef(null);
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "plaintext";
    const code = String(children).replace(/\n$/, "");

    if (!inline && enableCopy && isComplete) {
      return (
        <div className="relative group" ref={codeContainerRef}>
          <button
            ref={buttonRef}
            onClick={() => handleCopyCode(code, buttonRef)}
            className="absolute right-1 top-1 px-1 py-0.5 text-xs rounded bg-gray-700 text-gray-200 
                      sm:right-2 sm:top-2 sm:px-2 sm:py-1
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Copy code"
          >
            <span className="hidden sm:inline">Copy</span>
            <span className="sm:hidden">Copy</span>
          </button>
          <div className="overflow-x-auto max-w-full">
            <SyntaxHighlighter
              language={language}
              style={themeConfig.codeStyle}
              PreTag="div"
              customStyle={{
                margin: 0,
                borderRadius: "0.375rem",
                padding: "0.75rem",
                fontSize: "0.75rem",
                lineHeight: 1.4,
                overflowX: "auto",
                maxWidth: "100%"
              }}
              codeTagProps={{
                style: {
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  lineHeight: 1.5
                }
              }}
              {...props}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    }

    return !inline ? (
      <div className="overflow-x-auto max-w-full">
        <SyntaxHighlighter
          language={language}
          style={themeConfig.codeStyle}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: "0.375rem",
            padding: "0.75rem",
            fontSize: "0.75rem",
            lineHeight: 1.4,
            overflowX: "auto",
            maxWidth: "100%"
          }}
          codeTagProps={{
            style: {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              lineHeight: 1.5
            }
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={`px-1 py-0.5 rounded text-xs sm:text-sm font-mono ${themeConfig.inlineCodeClass}`} {...props}>
        {children}
      </code>
    );
  };

  // Component map for markdown elements with responsive styling
  const components = {
    code: CodeBlock,
    h1: ({ node, ...props }) => (
      <h1 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 border-b pb-2 border-gray-300 dark:border-gray-700" {...props} />
    ),
    h2: ({ node, ...props }) => <h2 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5 mb-2 sm:mb-3" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-base sm:text-lg font-bold mt-3 sm:mt-4 mb-2" {...props} />,
    p: ({ node, ...props }) => <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 text-sm sm:text-base" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4 text-sm sm:text-base" {...props} />,
    li: ({ node, ...props }) => <li className="mb-1 text-sm sm:text-base" {...props} />,
    a: ({ node, ...props }) => (
      <a className={`${themeConfig.linkClass} text-sm sm:text-base break-words`} target="_blank" rel="noopener noreferrer" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 sm:pl-4 italic mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-300" {...props} />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto mb-3 sm:mb-4 rounded border border-gray-200 dark:border-gray-700 text-sm sm:text-base">
        <table className="min-w-full border-collapse" {...props} />
      </div>
    ),
    tr: ({ node, ...props }) => <tr className="border-b border-gray-200 dark:border-gray-700" {...props} />,
    th: ({ node, ...props }) => (
      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-semibold bg-gray-100 dark:bg-gray-800 text-sm sm:text-base" {...props} />
    ),
    td: ({ node, ...props }) => <td className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base" {...props} />,
    hr: ({ node, ...props }) => <hr className="my-4 sm:my-6 border-gray-300 dark:border-gray-700" {...props} />,
    img: ({ node, ...props }) => (
      <img
        className="max-w-full h-auto mb-3 sm:mb-4 rounded shadow-md"
        loading="lazy"
        {...props}
        alt={props.alt || "Image"}
        style={{ maxWidth: "100%" }}
      />
    ),
  };

  return (
    <div className={`ai-response w-full max-w-full ${className}`}>
      <ReactMarkdown
        children={displayText}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
        skipHtml={false}
      />
    </div>
  );
};

// Helper function for backward compatibility
export const formatAIResponse = (text) => {
  return <AIResponseFormatter text={text} />;
};