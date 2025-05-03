import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

type InfoTooltipProps = {
  text: string;
  side?: "top" | "right" | "bottom" | "left";
};

const InfoTooltip = ({ text, side }: InfoTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <CircleHelp size={16} className="text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent className="max-w-sm" side={side}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
