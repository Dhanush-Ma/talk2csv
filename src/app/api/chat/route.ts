import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { tools } from "./tools";
import { openai } from "@ai-sdk/openai";
import { ChatModel } from "@/types/common/utils.type";

export const maxDuration = 180;

type ChatRequestBody = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any; // Replace with your actual Message type
  model: ChatModel;
  chatId: string;
};

export async function POST(req: Request) {
  const { messages, model } = (await req.json()) as ChatRequestBody;

  const llmModel =
    model.provider === "OpenAI" ? openai(model.id) : google(model.id);

  const result = streamText({
    model: llmModel,
    messages,
    tools: tools,
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
