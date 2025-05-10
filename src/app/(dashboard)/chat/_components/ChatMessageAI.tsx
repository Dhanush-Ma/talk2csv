import Logo from "@/components/shared/Logo";
import { ToolInvocation, UIMessage } from "ai";
import { Ellipsis } from "lucide-react";
import React from "react";
import MarkdownRender from "@/components/shared/MarkdownRender";
import { VizData } from "@/types/common/utils.type";
import ChatBarVisualization from "./ChatBarVisualization";
import ChatPieVisualization from "./ChatPieVisualization";

const ChatMessageAI = ({
  message,
  loading = false,
  children,
}: {
  message?: UIMessage;
  loading?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-4 w-full max-w-full">
      <div className="h-8 w-8 rounded-full border-2 border-primary overflow-hidden shrink-0">
        <Logo className="h-8 w-8 rounded-full" width={12} height={12} />
      </div>
      <div className="min-w-0 flex-1">
        {children ?? (
          <>
            {loading ? (
              <div className="bg-muted w-12 h-8 rounded-full flex items-center justify-center">
                <Ellipsis className="animate-pulse text-primary" />
              </div>
            ) : (
              <div>
                {message?.content && (
                  <MarkdownRender>{message.content}</MarkdownRender>
                )}
                <div>
                  {message?.parts.map((part) => {
                    switch (part.type) {
                      case "tool-invocation": {
                        const { toolCallId, args, toolName } =
                          part.toolInvocation as Omit<
                            ToolInvocation,
                            "args"
                          > & {
                            args: VizData;
                          };

                        switch (toolName) {
                          case "visualAgent": {
                            if (args.name === "bar-chart") {
                              return (
                                <ChatBarVisualization
                                  key={toolCallId}
                                  vizData={args}
                                />
                              );
                            }

                            if (args.name === "pie-chart") {
                              return (
                                <ChatPieVisualization
                                  key={toolCallId}
                                  vizData={args}
                                />
                              );
                            }
                          }

                          default:
                            return null;
                        }
                      }
                    }

                    return null;
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessageAI;
