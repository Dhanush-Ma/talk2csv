import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const LoadingTable = () => {
  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          {Array.from({ length: 5 }, (_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-4 w-24 bg-muted-foreground/50" />
            </TableHead>
          ))}
          <TableHead>
            <Skeleton className="h-4 w-4 bg-muted-foreground/50" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 17 }, (_, index) => (
          <TableRow key={index}>
            {Array.from({ length: 5 }, (_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-24 bg-muted-foreground/50" />
              </TableHead>
            ))}
            <TableHead>
              <Skeleton className="h-4 w-4 bg-muted-foreground/50" />
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoadingTable;
