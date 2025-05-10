import { VizData } from "@/types/common/utils.type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { chartColors } from "@/lib/utils";

const ChatPieVisualization = ({ vizData }: { vizData: VizData }) => {
  return (
    <div className="mt-12">
      <ChartContainer config={{}} className="min-h-[200px] w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={vizData.data} dataKey="value" nameKey="label">
            {vizData.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <h3 className="text-sm text-muted-foreground text-center mt-1">
        {vizData.description}
      </h3>
    </div>
  );
};

export default ChatPieVisualization;
