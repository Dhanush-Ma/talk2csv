/* eslint-disable react-hooks/rules-of-hooks */
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
import { useAction } from "next-safe-action/hooks";
import { createNewChat } from "@/services/actions/chat.actions";
import { ERROR_MESSAGES } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const columnHelper = createColumnHelper<SelectUserFile>();

export const columns = [
  columnHelper.accessor("name", {
    id: "fileName",
    header: "Name",
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
      const router = useRouter();
      const client = useQueryClient();
      const { execute } = useAction(createNewChat, {
        onError: () => {
          toast.error(ERROR_MESSAGES.CHAT_CREATION_FAILED, {
            id: "create-chat",
          });
        },
        onExecute: () => {
          toast.loading("Creating new chat...", {
            id: "create-chat",
          });
        },
        onSuccess: ({ data }) => {
          toast.dismiss("create-chat");
          if (data?.status === "success") {
            router.push(`/chat/${data.data.chatId}`);
            client.invalidateQueries({
              queryKey: ["chats"],
            });
          } else {
            toast.error(ERROR_MESSAGES.CHAT_CREATION_FAILED);
          }
        },
      });

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
            <DropdownMenuItem
              className="hover:!text-foreground"
              onClick={() => {
                execute({
                  fileId: info.row.original.id,
                });
              }}
            >
              <MessageSquareShare />
              New chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ArchiveFile
              fileId={info.row.original.id}
              tableName={info.row.original.tableName}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
