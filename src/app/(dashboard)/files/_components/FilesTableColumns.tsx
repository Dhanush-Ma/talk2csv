import { createColumnHelper } from "@tanstack/react-table";
import { SelectUserFile } from "@/db/schema/files";
import { MoreVertical, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  }),

  columnHelper.accessor("rows", {
    id: "rows",
    header: "Rows",
  }),

  columnHelper.accessor("size", {
    id: "sizeMB",
    header: "Size (MB)",
  }),

  columnHelper.accessor("tags", {
    id: "tags",
    header: "Tags",
    cell: (info) => info.getValue().join(", "),
  }),

  columnHelper.accessor("tags", {
    id: "tags",
    header: () => {
      return <Settings2 size={16} />;
    },
    cell: (info) => {
      return (
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreVertical size={16} />
        </Button>
      );
    },
  }),
];
