"use client";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./FilesTableColumns";
import { SelectUserFile } from "@/db/schema/files";
import { useEffect, useState } from "react";
import { useFilesStore } from "@/store/files.store";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Telescope,
} from "lucide-react";
import EmptyTableWrapper from "@/components/shared/EmptyTableWrapper";
import { AppConfig } from "@/lib/config";

export type TData = {
  id: string;
  fileName: string;
  uploadedOn: string;
  rows: number;
  sizeMB: number;
  tags: string[];
  actions: never[];
};

type FilesTableProps = {
  files: SelectUserFile[];
  fetchError: string | null;
};

const FilesTable = ({ files, fetchError }: FilesTableProps) => {
  const [data, setData] = useState(() => [...files]);
  const { setFiles, setIsFilesFetched } = useFilesStore();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: AppConfig.TABLE_PAGE_SIZE,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setData(files);
    setFiles(files);
    setIsFilesFetched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className="content-margin-x">
      <Table
        className="overflow-clip relative"
        divClassName="overflow-auto rounded-md border min-h-[calc(100dvh-12rem)] max-h-[calc(100dvh-12rem)] border rounded-md"
      >
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="sticky top-0 bg-muted z-10 hover:bg-muted"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-sidebar-primary-foreground/20">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : fetchError ? (
            <EmptyTableWrapper colSpan={columns.length}>
              <div className="flex items-center justify-center border w-max p-2 rounded-md border-yellow-300 bg-yellow-300/10">
                <AlertTriangle size={16} className="text-yellow-500" />
              </div>
              <p>{fetchError}</p>
              <Button
                variant="outline"
                className="!hover:bg-transparent"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Try Again
              </Button>
            </EmptyTableWrapper>
          ) : (
            <EmptyTableWrapper colSpan={columns.length}>
              <Telescope size={64} className="text-primar" strokeWidth={0.5} />
              <p>
                Nothing here yet. Upload a CSV to create your first data
                conversation.
              </p>
            </EmptyTableWrapper>
          )}
        </TableBody>
      </Table>
      <div className="content-padding-y flex justify-end">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <p className="text-sm">
            Showing{" "}
            <strong>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </strong>{" "}
            to{" "}
            <strong>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                table.getRowModel().rows.length}
            </strong>{" "}
            of <strong>{table.getRowCount()}</strong> files
          </p>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesTable;
