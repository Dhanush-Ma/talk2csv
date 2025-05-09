import { db } from "@/db";
import { tool, ToolSet } from "ai";
import { z } from "zod";

export const tools: ToolSet = {
  sqlAgent: tool({
    description:
      "Executes safe, read-only SQL queries against structured datasets to extract insights and answer user questions. Designed to interact only with SELECT statements, ensuring data integrity.",
    parameters: z.object({
      query: z.string().describe("The actual SQL query to execute.").max(5000),
    }),
    execute: async ({ query }: { query: string }) => {
      console.log("TOOL_CALL_TRIGGERED", "sqlAgent");
      try {
        const results = await db.execute(query);

        // const { response } = await generateText({
        //   model: google(DEFAULT_CHAT_MODEL.id),
        //   system:
        //     `You are a data assistant helping users interpret SQL query results.
        //         Your task is to:
        //         - Analyze and summarize the results retrieved from the SQL query below.
        //         - Present the results in a readable **markdown table** format.
        //         - Highlight notable trends, patterns, or anomalies in plain language.
        //         - Do not reprint or explain the SQL query syntax.
        //         - Keep the explanation concise and user-friendly.`.trim(),
        //   messages: [
        //     {
        //       role: "user",
        //       content: `Here are the results from the SQL query ${query}: \n${results}`,
        //     },
        //   ],
        // });

        // console.log(response.messages[0]);

        // return response.messages[0];

        return results;
      } catch (error) {
        console.error("Error executing SQL query:", error);
        return "An error occurred while executing the SQL query. Please try again.";
      }
    },
  }),
};
