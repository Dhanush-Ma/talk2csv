"use client";

import { DEFAULT_CHAT_MODEL } from "@/lib/chat.config";
import { useChat } from "@ai-sdk/react";
import React from "react";

const ChatPage = () => {
  const { messages } = useChat({
    id: "123",
    body: {
      model: DEFAULT_CHAT_MODEL.id,
    },
  });

  const m = [
    { role: "user", content: "Hello, how are you?" },
    { role: "assistant", content: "I'm fine, thank you!" },
    {
      role: "user",
      content:
        "Hey, I’ve been thinking… I feel really close to you, and I wanted to talk about us taking the next step—being intimate for the first time.",
    },
    {
      role: "assistant",
      content:
        "Thank you for sharing that. I’ve been thinking about it too. I really care about you, and I want it to be special for both of us.",
    },
    {
      role: "user",
      content:
        "I want us both to feel ready and comfortable. No pressure at all—just being honest about how I feel.",
    },
    {
      role: "assistant",
      content:
        "That means a lot. I feel safe with you, and I agree—it should happen when we’re both fully comfortable and excited about it, not nervous or unsure.",
    },
    {
      role: "user",
      content:
        "Would it help if we talked about what we’re comfortable with and maybe what we’re nervous about?",
    },
    {
      role: "assistant",
      content:
        "Yes, I think that’s a great idea. Open communication will help us both feel more connected and confident. We can take our time with this.",
    },
    {
      role: "user",
      content:
        "I appreciate that. I think I just want to feel close and connected, not rushed. Even just cuddling means a lot to me.",
    },
    {
      role: "assistant",
      content:
        "Same here. Intimacy for me includes all those little moments too—like holding hands, cuddling, even just being alone together in a peaceful way.",
    },
    {
      role: "user",
      content:
        "I like that you see it that way. That makes me feel less anxious and more excited.",
    },
    {
      role: "assistant",
      content:
        "Good. I want this to feel safe and special for both of us. We can go at whatever pace feels right.",
    },
    {
      role: "user",
      content: "Is there anything you feel unsure or nervous about?",
    },
    {
      role: "assistant",
      content:
        "Maybe just wanting to make sure I don’t disappoint you or do something you’re not okay with. Communication really helps with that.",
    },
    {
      role: "user",
      content:
        "I totally understand. I’m nervous too, but more because it’s new. I trust you though, and I think that’s what matters most.",
    },
    {
      role: "assistant",
      content:
        "I trust you too. I think as long as we keep talking like this, it’ll be a positive experience for both of us.",
    },
    {
      role: "user",
      content:
        "Would it be okay if, when the time comes, we talked through it in the moment too? Like asking each other how we’re feeling?",
    },
    {
      role: "assistant",
      content:
        "Absolutely. That sounds perfect. I’d feel reassured checking in with each other, making sure everything feels right.",
    },
    {
      role: "user",
      content: "And it’s okay to stop anytime, no matter what, right?",
    },
    {
      role: "assistant",
      content:
        "100%. There’s no pressure or expectation. If one of us feels unsure, we pause. That’s how it should be.",
    },
    {
      role: "user",
      content:
        "Thank you for being so understanding. I really love how open we can be with each other.",
    },
    {
      role: "assistant",
      content: "Me too. This kind of honesty makes me feel even closer to you.",
    },
    {
      role: "user",
      content:
        "Maybe we can plan a cozy night together soon? Just to be close, no expectations—just intimacy and comfort.",
    },
    {
      role: "assistant",
      content:
        "I’d love that. We could make it special, like light some candles, put on music, and just be in the moment.",
    },
    {
      role: "user",
      content: "That sounds perfect. I’m smiling just thinking about it.",
    },
    {
      role: "assistant",
      content:
        "Me too. I think it’s going to be something we remember fondly—not because of what happens, but because of how we feel together.",
    },
    {
      role: "user",
      content:
        "Exactly. I care so much about you, and I feel so lucky to be going through this with you.",
    },
    {
      role: "assistant",
      content:
        "I feel the same. Whenever we’re ready, we’ll know. And until then, just being close is more than enough.",
    },
    {
      role: "user",
      content:
        "Thank you for being so patient and kind. I feel really safe with you.",
    },
    {
      role: "assistant",
      content:
        "That means everything to me. You deserve to feel that way, always.",
    },
  ];

  return (
    <>
      {m.map((message, idx) => (
        <div key={idx}>
          {message.role === "user" ? "He: " : "She: "}
          {message.content}
        </div>
      ))}
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}
    </>
  );
};

export default ChatPage;
