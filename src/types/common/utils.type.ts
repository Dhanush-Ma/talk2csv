import { JSX, SVGProps } from "react";

export interface ServerActionResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
}

export type CSVRow = Record<string, string>;

export type ChatModel = {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  id: string;
  provider: string;
  disabled: boolean;
};

export type ChartItem = {
  label: string;
  value: number;
};

export type VizData = {
  name: "bar-chart" | "pie-chart";
  description: string;
  data: ChartItem[];
};
