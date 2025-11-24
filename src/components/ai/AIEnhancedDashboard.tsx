"use client";

import React, { useEffect, useState } from "react";
import { aiAnalyticsService } from "@/services/aiAnalyticsService";
import RichHealthDashboard from "@/components/dashboard/RichHealthDashboard";
import { Brain, Wifi, WifiOff, Lightbulb, TrendingUp } from "lucide-react";

interface AIStatusProps {
  isOnline: boolean;
  onRefresh: () => void;
}

const AIStatusBanner: React.FC<AIStatusProps> = ({ isOnline, onRefresh }) => {
  return (
    <div
      className={`
      fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg border
      ${
        isOnline
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-amber-50 border-amber-200 text-amber-800"
      }
    `}
    >
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4" />
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">AI Analytics: Online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">AI Analytics: Offline</span>
          </>
        )}
        <button
          onClick={onRefresh}
          className="ml-2 text-xs px-2 py-1 rounded bg-white/50 hover:bg-white/80 transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

interface AIChatPanelProps {
  isOnline: boolean;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({ isOnline }) => {
  const [messages, setMessages] = useState<
    Array<{ type: "user" | "ai"; content: string; timestamp: string }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();

      const aiMessage = {
        type: "ai" as const,
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        type: "ai" as const,
        content:
          "Sorry, I'm having trouble connecting. Please make sure the AI backend is running and try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="rounded-lg p-4 mt-4"
      style={{
        background: "linear-gradient(to right, #f0f7ff, #e6f3ff)",
        border: "1px solid #b3d9ff",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-5 w-5" style={{ color: "#2159A9" }} />
        <h3 className="text-lg font-semibold" style={{ color: "#1a4480" }}>
          Chat with Rwanda Health AI
        </h3>
        <div
          className="ml-auto px-2 py-1 rounded text-xs"
          style={{
            backgroundColor: isOnline ? "#e6f3ff" : "#fff3cd",
            color: isOnline ? "#2159A9" : "#856404",
          }}
        >
          {isOnline ? "🤖 AI Online" : "⚡ Basic Mode"}
        </div>
      </div>

      <div
        className="bg-white rounded-lg mb-3"
        style={{ border: "1px solid #b3d9ff" }}
      >
        <div
          className="h-96 overflow-y-auto p-4 space-y-4"
          style={{ backgroundColor: "#f8fbff" }}
        >
          {messages.length === 0 && (
            <div className="text-center py-12" style={{ color: "#6b7280" }}>
              <Brain
                className="h-16 w-16 mx-auto mb-3"
                style={{ color: "#9ca3af" }}
              />
              <p className="text-lg font-medium mb-2">
                Ask me about Rwanda's health transformation!
              </p>
              <div className="space-y-1 text-sm">
                <p className="bg-white rounded px-3 py-1 inline-block">
                  💡 "How did Rwanda reduce child mortality?"
                </p>
                <br />
                <p className="bg-white rounded px-3 py-1 inline-block">
                  📊 "Predict health outcomes for 2030"
                </p>
                <br />
                <p className="bg-white rounded px-3 py-1 inline-block">
                  🏥 "Compare provinces' health performance"
                </p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className="max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg"
                style={{
                  backgroundColor:
                    message.type === "user" ? "#2159A9" : "#f9fafb",
                  color: message.type === "user" ? "white" : "#111827",
                  border: message.type === "ai" ? "1px solid #e5e7eb" : "none",
                }}
              >
                <div
                  className={`text-sm ${
                    message.type === "ai" ? "leading-relaxed" : ""
                  }`}
                >
                  {message.type === "ai" ? (
                    <div className="prose prose-sm max-w-none">
                      {message.content.split("\n").map((paragraph, pIndex) => {
                        // Handle numbered lists
                        if (paragraph.match(/^\d+\.\s+\*\*/)) {
                          const [, number, title, content] =
                            paragraph.match(
                              /^(\d+)\.\s+\*\*([^*]+)\*\*:\s*(.*)/
                            ) || [];
                          return (
                            <div key={pIndex} className="mb-3">
                              <div className="flex items-start gap-2">
                                <span
                                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                                  style={{
                                    backgroundColor: "#e6f3ff",
                                    color: "#2159A9",
                                  }}
                                >
                                  {number}
                                </span>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {title}
                                  </h4>
                                  <p className="text-gray-700 text-sm">
                                    {content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // Handle bold text
                        if (paragraph.includes("**")) {
                          const formatted = paragraph.replace(
                            /\*\*([^*]+)\*\*/g,
                            '<strong class="font-semibold text-gray-900">$1</strong>'
                          );
                          return (
                            <p
                              key={pIndex}
                              className="mb-2 text-gray-700"
                              dangerouslySetInnerHTML={{ __html: formatted }}
                            />
                          );
                        }

                        // Handle regular paragraphs
                        if (paragraph.trim()) {
                          return (
                            <p key={pIndex} className="mb-2 text-gray-700">
                              {paragraph}
                            </p>
                          );
                        }

                        return null;
                      })}
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
                <div
                  className="text-xs mt-2"
                  style={{
                    color: message.type === "user" ? "#b3d9ff" : "#6b7280",
                  }}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div
                className="px-3 py-2 rounded-lg"
                style={{ backgroundColor: "#f3f4f6", color: "#111827" }}
              >
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: "#2159A9" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#2159A9",
                      animationDelay: "0.1s",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#2159A9",
                      animationDelay: "0.2s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div
          className="p-4 bg-white"
          style={{ borderTop: "1px solid #b3d9ff" }}
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isOnline
                  ? "Ask about Rwanda's health data..."
                  : "Basic mode - limited responses"
              }
              className="flex-1 px-4 py-3 rounded-lg resize-none"
              style={{
                border: "1px solid #d1d5db",
                color: "#111827",
                backgroundColor: "white",
              }}
              onFocus={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "0 0 0 2px #2159A9";
                e.target.style.borderColor = "transparent";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
                e.target.style.borderColor = "#d1d5db";
              }}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: "#2159A9",
                opacity: isLoading || !inputMessage.trim() ? 0.5 : 1,
                cursor:
                  isLoading || !inputMessage.trim() ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.currentTarget.style.backgroundColor = "#1a4480";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.currentTarget.style.backgroundColor = "#2159A9";
                }
              }}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>

          {!isOnline && (
            <div
              className="mt-2 text-xs px-2 py-1 rounded"
              style={{ color: "#92400e", backgroundColor: "#fef3c7" }}
            >
              ⚠️ AI backend offline - responses will be limited
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AIEnhancedDashboard: React.FC = () => {
  const [aiStatus, setAiStatus] = useState(false);

  const checkAIStatus = async () => {
    const status = await aiAnalyticsService.checkStatus();
    setAiStatus(status);
  };

  useEffect(() => {
    checkAIStatus();
    // Check status every 30 seconds
    const interval = setInterval(checkAIStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <AIStatusBanner isOnline={aiStatus} onRefresh={checkAIStatus} />

      <RichHealthDashboard />

      <div className="mt-6 space-y-4">
        <AIChatPanel isOnline={aiStatus} />
      </div>
    </div>
  );
};

export default AIEnhancedDashboard;
