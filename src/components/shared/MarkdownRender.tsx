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

const MarkdownRender = ({ children }: { children: string }) => {
  return (
    <div className="prose prose-sm break-words whitespace-pre-wrap markdow">
      <Markdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={{
          table(props) {
            const { children, className, ...rest } = props;

            // Assuming children includes <thead> and <tbody> from markdown
            const [thead, tbody] = React.Children.toArray(children);

            const renderHeader = () => {
              const rows = React.Children.toArray(thead?.props?.children ?? []);
              return (
                <TableHeader>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      {React.Children.map(
                        row?.props?.children ?? [],
                        (cell, i) => (
                          <TableHead key={i}>{cell.props.children}</TableHead>
                        )
                      )}
                    </TableRow>
                  ))}
                </TableHeader>
              );
            };

            const renderBody = () => {
              const rows = React.Children.toArray(tbody?.props?.children ?? []);
              return (
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      {React.Children.map(
                        row?.props?.children ?? [],
                        (cell, i) => (
                          <TableCell key={i}>{cell.props.children}</TableCell>
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
        {children}
      </Markdown>
    </div>
  );
};

export default MarkdownRender;
