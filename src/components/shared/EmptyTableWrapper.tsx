import React from "react";
import { TableCell, TableRow } from "../ui/table";

type EmptyTableWrapperProps = {
  children?: React.ReactNode;
  colSpan?: number;
};

const EmptyTableWrapper = ({ children, colSpan }: EmptyTableWrapperProps) => {
  return (
    <TableRow className="bg-sidebar hover:bg-sidebar">
      <TableCell colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center gap-4 w-full h-[calc(100dvh-15.7rem)]">
          {children}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableWrapper;
