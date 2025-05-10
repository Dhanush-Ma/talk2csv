import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { VizData } from "@/types/common/utils.type";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const ChatBarVisualization = ({ vizData }: { vizData: VizData }) => {
  return (
    <div className="mt-12">
      <ChartContainer config={{}} className="min-h-[200px] w-full">
        <BarChart data={vizData.data} width={500} height={300}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            fill="var(--primary)"
          />
          <YAxis fill="var(--primary)" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="var(--primary)" />
        </BarChart>
      </ChartContainer>
      <h3 className="text-sm text-muted-foreground text-center mt-1">
        {vizData.description}
      </h3>
    </div>
  );
};

export default ChatBarVisualization;
