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

        return results;
      } catch (error) {
        console.error("Error executing SQL query:", error);
        return "An error occurred while executing the SQL query. Please try again.";
      }
    },
  }),

  visualAgent: tool({
    description:
      "Generates visualizations based on the provided data in the form of either a bar chart or pie chart. This tool helps create data visualizations for clearer insights, and it accepts data in structured formats to visualize key metrics or categories.",
    parameters: z.object({
      name: z
        .enum(["bar-chart", "pie-chart"])
        .describe("The type of chart, either 'bar-chart' or 'pie-chart'."),
      description: z
        .string()
        .describe(
          "A brief description of the chart, explaining its purpose or what it visualizes."
        ),
      data: z
        .array(
          z.object({
            label: z
              .string()
              .describe(
                "The label for the data category (e.g., 'Engineering', 'Product A')."
              ),
            value: z
              .number()
              .min(0)
              .describe(
                "The numerical value associated with the data category (e.g., budget or sales figures)."
              ),
          })
        )
        .describe(
          "An array of data points representing different categories and their values."
        ),
    }),
  }),
};
