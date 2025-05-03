import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectUserFile } from "@/db/schema/files";
import { createColumnHelper } from "@tanstack/react-table";
import {
  ExternalLink,
  MessageSquareShare,
  MoreVerticalIcon,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import ArchiveFile from "./ArchiveFile";
import { toast } from "sonner";
import { deleteUserFile } from "@/services/actions/files.actions";
import { ERROR_MESSAGES } from "@/lib/constants";
import { useAction } from "next-safe-action/hooks";

const columnHelper = createColumnHelper<SelectUserFile>();

export const columns = [
  columnHelper.accessor("name", {
    id: "fileName",
    header: "File Name",
    cell: (info) => (
      <div className="flex items-center">
        <span className="font-medium">{info.getValue()}</span>
      </div>
    ),
  }),

  columnHelper.accessor("uploadedAt", {
    id: "uploadedAt",
    header: "Uploaded At",
    cell: (info) => {
      const date = new Date(info.getValue());
      return (
        <span>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  }),

  columnHelper.accessor("rows", {
    id: "rows",
    header: "Rows",
  }),

  columnHelper.accessor("size", {
    id: "size",
    header: "Size",
    cell: (info) => {
      const sizeInBytes = info.getValue();
      const sizeInMB = sizeInBytes / (1024 * 1024);
      return (
        <span>
          {sizeInMB >= 1 ? `${sizeInMB.toFixed(2)} MB` : `${sizeInBytes} bytes`}
        </span>
      );
    },
  }),

  columnHelper.accessor("tags", {
    id: "tags",
    header: "Tags",
    cell: (info) => {
      const tags = info.getValue();
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground border"
            >
              {tag}
            </span>
          ))}
          {tags.length === 0 && (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      );
    },
  }),

  columnHelper.accessor("userId", {
    id: "actions",
    header: () => {
      return (
        <Button
          variant="ghost"
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted ml-auto"
          size="icon"
        >
          <Settings2 />
          <span className="sr-only">Actions</span>
        </Button>
      );
    },
    cell: (info) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { execute } = useAction(deleteUserFile, {
        onExecute: () =>
          toast.loading("Deleting file...", {
            id: info.row.original.id,
          }),
        onSuccess: () =>
          toast.success("File deleted successfully.", {
            id: info.row.original.id,
          }),
        onError: () =>
          toast.error(ERROR_MESSAGES.GENERAL_ERROR, {
            id: info.row.original.id,
          }),
      });

      const handleDelete = async () => {
        execute({
          fileId: info.row.original.id,
          tableName: info.row.original.tableName,
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted ml-auto"
              size="icon"
            >
              <MoreVerticalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <Link href={`/files/f/${info.row.original.id}`}>
              <DropdownMenuItem className="hover:!text-foreground">
                <ExternalLink />
                Preview
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={`/chat/c?fileId=${info.row.original.id}`}>
              <DropdownMenuItem className="hover:!text-foreground">
                <MessageSquareShare />
                New chat
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <ArchiveFile handleDelete={handleDelete} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
