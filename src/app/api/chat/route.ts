import { saveChatMessage } from "@/services/actions/chat.actions";
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
  const { messages, model, chatId } = (await req.json()) as ChatRequestBody;

  const llmModel =
    model.provider === "OpenAI" ? openai(model.id) : google(model.id);

  const result = streamText({
    model: llmModel,
    messages,
    tools: tools,
    maxSteps: 2,
    onFinish: async ({ response }) => {
      for (const message of response.messages) {
        const content = message.content[0];

        if (message.role === "assistant") {
          if (typeof content === "string") {
            saveChatMessage({
              chatId,
              content,
              role: message.role,
            });
          } else if (typeof content === "object" && "type" in content) {
            if (content.type === "text") {
              saveChatMessage({
                chatId,
                content: content.text,
                role: message.role,
              });
            }
          }
        }
      }
    },
  });

  return result.toDataStreamResponse();
}
