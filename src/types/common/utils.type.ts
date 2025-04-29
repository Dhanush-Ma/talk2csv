export interface ServerActionResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
}
