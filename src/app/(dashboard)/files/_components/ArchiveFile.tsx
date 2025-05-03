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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Archive } from "lucide-react";

type ArchiveFileProps = {
  handleDelete: () => void;
};

export default function ArchiveFile({ handleDelete }: ArchiveFileProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="bg-destructive/80 text-white hover:!text-white hover:!bg-destructive/90 focus:!bg-destructive/90 focus:!text-white data-[disabled]:bg-destructive/50 data-[disabled]:text-destructive-foreground"
        >
          <Archive className="text-white" />
          Archive
        </DropdownMenuItem>
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
