import GoogleSvg from "@/assets/svgs/google.svg";
import OpenAiSvg from "@/assets/svgs/openai.svg";

export const CHAT_MODELS = [
  {
    icon: GoogleSvg,
    name: "Gemini 2.0 Flash",
    id: "gemini-2.0-flash",
    provider: "Google",
    disabled: false,
  },
  {
    icon: OpenAiSvg,
    name: "GPT-4o mini",
    id: "gpt-4o-mini",
    provider: "OpenAI",
    disabled: true,
  },
];

export const DEFAULT_CHAT_MODEL = CHAT_MODELS[0];
