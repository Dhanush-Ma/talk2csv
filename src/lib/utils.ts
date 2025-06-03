import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import short from "short-uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTableName(name: string) {
  const nameWithoutNumbersAndSpecialChars = name
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase();

  return `${nameWithoutNumbersAndSpecialChars}`;
}

export function retrieveUniqueTableName(name: string): string {
  const shortuuid = short().generate().slice(0, 10);

  return `${name.slice(0, 10)}_${shortuuid}`;
}

export function generateCreateTableSQL(headers: string[], tableName: string) {
  if (!tableName) throw new Error("Table name is required.");
  if (!headers || headers.length === 0) throw new Error("Headers are empty.");

  const sanitizedHeaders = headers.map((h) => `\"${h.trim()}\" TEXT`);
  return `CREATE TABLE \"${tableName}\" (\n  ${sanitizedHeaders.join(
    ",\n  "
  )}\n);`;
}

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
  "var(--chart-11)",
  "var(--chart-12)",
  "var(--chart-13)",
  "var(--chart-14)",
  "var(--chart-15)",
  "var(--chart-16)",
  "var(--chart-17)",
  "var(--chart-18)",
  "var(--chart-19)",
  "var(--chart-20)",
  "var(--chart-21)",
  "var(--chart-22)",
  "var(--chart-23)",
  "var(--chart-24)",
  "var(--chart-25)",
];
