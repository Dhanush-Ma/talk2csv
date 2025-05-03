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
  const shortuuid = short.generate();

  return `${name}_${shortuuid}`;
}

export function generateCreateTableSQL(headers: string[], tableName: string) {
  if (!tableName) throw new Error("Table name is required.");
  if (!headers || headers.length === 0) throw new Error("Headers are empty.");

  const sanitizedHeaders = headers.map((h) => `\"${h.trim()}\" TEXT`);
  return `CREATE TABLE \"${tableName}\" (\n  ${sanitizedHeaders.join(
    ",\n  "
  )}\n);`;
}
