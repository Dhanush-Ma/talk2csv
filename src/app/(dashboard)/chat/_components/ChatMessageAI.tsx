import Logo from "@/components/shared/Logo";
import { UIMessage } from "ai";
import { Ellipsis } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
              <div className="prose prose-sm break-words whitespace-pre-wrap markdow">
                <Markdown
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                  components={{
                    table(props) {
                      const { children, className, ...rest } = props;

                      // Assuming children includes <thead> and <tbody> from markdown
                      const [thead, tbody] = React.Children.toArray(children);

                      const renderHeader = () => {
                        const rows = React.Children.toArray(
                          thead?.props?.children ?? []
                        );
                        return (
                          <TableHeader>
                            {rows.map((row, idx) => (
                              <TableRow key={idx}>
                                {React.Children.map(
                                  row?.props?.children ?? [],
                                  (cell, i) => (
                                    <TableHead key={i}>
                                      {cell.props.children}
                                    </TableHead>
                                  )
                                )}
                              </TableRow>
                            ))}
                          </TableHeader>
                        );
                      };

                      const renderBody = () => {
                        const rows = React.Children.toArray(
                          tbody?.props?.children ?? []
                        );
                        return (
                          <TableBody>
                            {rows.map((row, idx) => (
                              <TableRow key={idx}>
                                {React.Children.map(
                                  row?.props?.children ?? [],
                                  (cell, i) => (
                                    <TableCell key={i}>
                                      {cell.props.children}
                                    </TableCell>
                                  )
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        );
                      };

                      return (
                        <Table
                          className={cn(
                            className,
                            "rounded-md border overflow-hidden border-muted"
                          )}
                          {...rest}
                        >
                          {renderHeader()}
                          {renderBody()}
                        </Table>
                      );
                    },
                  }}
                >
                  {message?.content}
                </Markdown>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessageAI;
