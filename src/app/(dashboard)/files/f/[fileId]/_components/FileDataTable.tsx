"use client";

import EmptyTableWrapper from "@/components/shared/EmptyTableWrapper";
import LoadingTable from "@/components/shared/LoadingTable";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppConfig } from "@/lib/config";
import { ERROR_MESSAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { fetchFileData } from "@/services/actions/files.actions";
import {
  AlertTriangle,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Telescope,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect } from "react";

type FileDataTableProps = {
  tableName: string;
};

type FileDataTable = {
  columns: string[];
  rows: string[][];
  rowsCount: number;
};

const FileDataTable = ({ tableName }: FileDataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [tableData, setTableData] = React.useState<FileDataTable | null>(null);
  const { isExecuting, execute } = useAction(fetchFileData, {
    onError: () => {
      setError(ERROR_MESSAGES.GENERAL_ERROR);
    },
    onSuccess: ({ data }) => {
      if (error) {
        setError(null);
      }
      setTableData({
        columns: data?.data.headers as string[],
        rows: data?.data.rows as string[][],
        rowsCount: data?.data.rowsCount as number,
      });
    },
  });

  useEffect(() => {
    execute({
      tableName,
      offset: page * AppConfig.TABLE_PAGE_SIZE,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tableName]);

  return (
    <div className="content-padding-x content-padding-y">
      {error ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4 w-full h-[calc(100dvh-6rem)]"
          )}
        >
          <div className="flex items-center justify-center border w-max p-2 rounded-md border-yellow-300 bg-yellow-300/10">
            <AlertTriangle size={16} className="text-yellow-500" />
          </div>
          <p>{error}</p>
          <Button
            variant="outline"
            className="!hover:bg-transparent"
            disabled={isExecuting}
            onClick={() => {
              execute({
                tableName,
                offset: page * AppConfig.TABLE_PAGE_SIZE,
              });
            }}
          >
            Try Again
          </Button>
        </div>
      ) : isExecuting ? (
        <div
          className={cn(
            "border rounded-md min-h-[calc(100dvh-6rem)] max-h-[calc(100dvh-6rem)] overflow-auto",
            {
              "min-h-[calc(100dvh-9.145rem)] max-h-[calc(100dvh-9.145rem)]":
                isExecuting,
            }
          )}
        >
          <LoadingTable />
        </div>
      ) : tableData ? (
        <>
          <Table
            className="overflow-clip relative"
            divClassName="overflow-auto rounded-md border min-h-[calc(100dvh-9.145rem)] max-h-[calc(100dvh-9.145rem)] border rounded-md w-full"
          >
            <TableHeader className="bg-muted">
              <TableRow className="sticky top-0 bg-muted z-10 hover:bg-muted">
                {tableData.columns.map((column) => {
                  return (
                    <TableHead
                      key={column as string}
                      className="min-w-[250px] max-w-[250px] truncate"
                    >
                      {column}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.rows?.length ? (
                tableData.rows.map((row, index) => (
                  <TableRow key={index}>
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className="min-w-[250px] max-w-[250px] truncate"
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <EmptyTableWrapper colSpan={tableData.columns.length}>
                  <Telescope
                    size={64}
                    className="text-primar"
                    strokeWidth={0.5}
                  />
                  <p>
                    No data available for this file. Please check the file
                    format or upload a new file.
                  </p>
                </EmptyTableWrapper>
              )}
            </TableBody>
          </Table>
          <div className="content-padding-y flex justify-end">
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <p className="text-sm">
                Showing <strong>{page * AppConfig.TABLE_PAGE_SIZE + 1}</strong>{" "}
                to{" "}
                <strong>
                  {Math.min(
                    (page + 1) * AppConfig.TABLE_PAGE_SIZE,
                    tableData.rowsCount
                  )}
                </strong>{" "}
                of <strong>{tableData.rowsCount}</strong> records
              </p>

              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                {/* First Page */}
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => setPage(0)}
                  disabled={isExecuting || page === 0}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon />
                </Button>

                {/* Previous Page */}
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={isExecuting || page === 0}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon />
                </Button>

                {/* Next Page */}
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() =>
                    setPage((prev) =>
                      prev + 1 <
                      Math.ceil(tableData.rowsCount / AppConfig.TABLE_PAGE_SIZE)
                        ? prev + 1
                        : prev
                    )
                  }
                  disabled={
                    isExecuting ||
                    page + 1 >=
                      Math.ceil(tableData.rowsCount / AppConfig.TABLE_PAGE_SIZE)
                  }
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon />
                </Button>

                {/* Last Page */}
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() =>
                    setPage(
                      Math.ceil(
                        tableData.rowsCount / AppConfig.TABLE_PAGE_SIZE
                      ) - 1
                    )
                  }
                  disabled={
                    isExecuting ||
                    page + 1 >=
                      Math.ceil(tableData.rowsCount / AppConfig.TABLE_PAGE_SIZE)
                  }
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FileDataTable;
