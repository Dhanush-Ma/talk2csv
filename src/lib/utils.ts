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

function inferPgType(values: unknown[]): string {
  let isInt = true;
  let isFloat = true;
  let isBool = true;
  let arrayType: string | null = null;

  for (const val of values) {
    if (val === null || val === undefined || val === "") continue;

    const strVal = String(val).trim();

    // Detect arrays by comma or brackets
    const possibleArray =
      strVal.startsWith("[") || strVal.includes(",") || strVal.endsWith("]");
    if (possibleArray) {
      const items = strVal
        .replace(/^\[|\]$/g, "") // remove brackets
        .split(",")
        .map((i) => i.trim().replace(/^"(.*)"$/, "$1")); // remove quotes

      if (items.every((v) => /^-?\d+$/.test(v))) {
        arrayType = "BIGINT[]";
      } else if (items.every((v) => /^-?\d+(\.\d+)?$/.test(v))) {
        arrayType = "DOUBLE PRECISION[]";
      } else {
        arrayType = "TEXT[]";
      }
      continue;
    }

    const lower = strVal.toLowerCase();

    if (!/^-?\d+$/.test(strVal)) isInt = false;
    if (!/^-?\d+(\.\d+)?$/.test(strVal)) isFloat = false;
    if (!["true", "false", "0", "1"].includes(lower)) isBool = false;

    if (!isInt && !isFloat && !isBool) {
      console.log(lower);
      break;
    }
  }

  if (arrayType) return arrayType;
  if (isInt) return "BIGINT";
  if (isFloat) return "DOUBLE PRECISION";
  if (isBool) return "BOOLEAN";
  return "TEXT";
}

export function generateCreateTableSQL(
  headers: string[],
  tableName: string,
  sampleRows: Record<string, unknown>[]
) {
  if (!tableName) throw new Error("Table name is required.");
  if (!headers || headers.length === 0) throw new Error("Headers are empty.");

  const sanitizedHeaders = headers.map((h) => {
    const sampleValues = sampleRows.map((row) => row[h]);
    const inferredType = inferPgType(sampleValues);
    return `"${h.trim()}" ${inferredType}`;
  });

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
