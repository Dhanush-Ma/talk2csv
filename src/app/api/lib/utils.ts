import * as fs from "fs";
import * as path from "path";

/**
 * Writes an object to a JSON file.
 * @param filePath - Path to the JSON file.
 * @param data - JavaScript object to write.
 * @param pretty - Whether to pretty-print the JSON.
 */
export function writeJsonToFile(
  filePath: string,
  data: unknown,
  pretty: boolean = true
): void {
  const dir = path.dirname(filePath);

  // Ensure the directory exists
  fs.mkdirSync(dir, { recursive: true });

  const jsonContent = pretty
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);

  fs.writeFileSync(filePath, jsonContent, "utf8");
}
