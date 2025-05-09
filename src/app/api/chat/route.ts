import { saveChatMessage } from "@/services/actions/chat.actions";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 180;

export async function POST(req: Request) {
  const { messages, model, chatId } = await req.json();

  const result = streamText({
    model: google(model),
    messages,
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
