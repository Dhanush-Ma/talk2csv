"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ERROR_MESSAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { deleteUserFile } from "@/services/actions/files.actions";
import { useQueryClient } from "@tanstack/react-query";
import { Archive } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type ArchiveFileProps = {
  fileId: string;
  tableName: string;
  children?: React.ReactNode;
};

export default function ArchiveFile({
  fileId,
  tableName,
  children,
}: ArchiveFileProps) {
  const queryClient = useQueryClient();
  const { execute } = useAction(deleteUserFile, {
    onExecute: () =>
      toast.loading("Deleting file...", {
        id: fileId,
      }),
    onSuccess: () => {
      toast.success("File deleted successfully.", {
        id: fileId,
      });

      // Invalidate the queries to refetch the chats
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
    onError: () =>
      toast.error(ERROR_MESSAGES.GENERAL_ERROR, {
        id: fileId,
      }),
  });

  const handleDelete = async () => {
    execute({
      fileId: fileId,
      tableName: tableName,
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ?? (
          <div
            onSelect={(e) => e.preventDefault()}
            className={cn(
              "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              "bg-destructive/80 text-white hover:!text-white hover:!bg-destructive/90 focus:!bg-destructive/90 focus:!text-white data-[disabled]:bg-destructive/50 data-[disabled]:text-destructive-foreground"
            )}
          >
            <Archive className="text-white" />
            Archive
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to archive the file?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="px-6">
          <p className="text-sm text-muted-foreground">
            Arhciving this file is permanent and cannot be reversed. Here&apos;s
            what will happen:
          </p>
          <ul className="list-disc list-inside text-muted-foreground text-sm mt-3">
            <li>The file will be removed from your Data Vault.</li>
            <li>
              All extracted data linked to this file will be permanently erased.
            </li>
            <li>
              Any conversations or insights derived from this file will be
              deleted.
            </li>
          </ul>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
