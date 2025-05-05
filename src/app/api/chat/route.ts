import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 180;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const result = streamText({
    model: google(model),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
