"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppConfig } from "@/lib/config";
import { ERROR_MESSAGES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { filesSchema } from "@/schema/files.schema";
import { createUserFile } from "@/services/actions/files.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "@radix-ui/react-tooltip";
import {
  CirclePlus,
  CloudUpload,
  FileSpreadsheet,
  Plus,
  X,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Papa, { ParseResult } from "papaparse";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import { formatTableName, retrieveUniqueTableName } from "@/lib/utils";
import InfoTooltip from "@/components/shared/InfoTooltip";
import { CSVRow } from "@/types/common/utils.type";

const AddNewFile = () => {
  const params = useSearchParams();
  const [open, setOpen] = React.useState(params.get("upload") === "true");
  const [previewData, setPreviewData] = React.useState<{
    headers: string[];
    rows: string[][];
  } | null>(null);
  const { isExecuting, execute } = useAction(createUserFile, {
    onSuccess: () => {
      setOpen(false);
      toast.success("File uploaded successfully!");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES.GENERAL_ERROR);
      }
    },
  });
  const [tagValue, setTagValue] = React.useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    maxSize: AppConfig.MAX_FILE_SIZE_MB * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length !== 0) {
        Papa.parse<CSVRow>(acceptedFiles[0], {
          header: true,
          skipEmptyLines: true,
          preview: 20,

          complete: (results: ParseResult<CSVRow>) => {
            setPreviewData({
              headers: results.meta.fields || [],
              rows: results.data.map((row) =>
                Object.values(row).map((value) => value.toString())
              ),
            });
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });

        form.setValue("file", acceptedFiles[0], {
          shouldValidate: true,
        });
      }
    },
    onDropRejected: () => {
      toast.error(
        `File upload failed, make sure the file is a CSV file and less than ${AppConfig.MAX_FILE_SIZE_MB}MB.`
      );
    },
  });

  const form = useForm<z.infer<typeof filesSchema>>({
    resolver: zodResolver(filesSchema),
    defaultValues: {
      name: "",
      tags: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof filesSchema>) => {
    const client = createClient();
    const {
      data: { user },
    } = await client.auth.getUser();

    Papa.parse<CSVRow>(data.file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results: ParseResult<CSVRow>) => {
        const headers = results.meta.fields || [];
        const rows = results.data;

        execute({
          ...data,
          userId: user!.id!,
          tableName: retrieveUniqueTableName(formatTableName(data.name)),
          headers: headers,
          rows: rows,
        });
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        form.reset();
        setTagValue("");
        setPreviewData(null);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Add new file
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-w-3xl">
        <DialogHeader>
          <DialogTitle>Upload a New File</DialogTitle>
          <DialogDescription>
            We&apos;ll automatically structure it into a searchable database.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 px-6">
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg. Digital Marketing Hires - 2022"
                      />
                    </FormControl>
                    {field.value && (
                      <FormDescription className="text-xs flex items-center gap-x-2">
                        <p>
                          Table name:{" "}
                          <span className="text-muted-foreground italic">
                            {formatTableName(field.value)}
                          </span>
                        </p>
                        <InfoTooltip
                          text="This is how your file will be named in the database."
                          side="right"
                        />
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel optional>Tags</FormLabel>
                    <div className="flex gap-x-2">
                      <Input
                        placeholder="eg. Sales"
                        value={tagValue}
                        onChange={(e) => {
                          setTagValue(e.currentTarget.value);
                        }}
                      />
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <Button
                              variant="outline"
                              disabled={!tagValue || field.value.length >= 3}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!tagValue) return;
                                field.onChange([...field.value, tagValue]);
                                setTagValue("");
                              }}
                            >
                              <Plus />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm" side={"bottom"}>
                            <p>
                              {field.value.length >= 3
                                ? "You can only add up to 3 tags."
                                : "Add this tag"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag, index) => (
                        <Badge
                          key={`${tag}-${index}`}
                          className="flex items-center gap-x-2 leading-0 py-1"
                        >
                          {tag}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("remove tag");
                              field.onChange(
                                field.value.filter((t) => t !== tag)
                              );
                            }}
                          >
                            <X className="cursor-pointer" size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="space-y-0 overflow-hidden">
                    <FormLabel>CSV File</FormLabel>
                    <FormControl>
                      {field.value ? (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-x-2">
                            <FileSpreadsheet size={16} />
                            <p className="text-sm text-muted-foreground">
                              {field.value.name}
                            </p>
                            <Button
                              variant="outline"
                              className="bg-destructive/80 text-white border-destructive hover:bg-destructive/90 hover:text-white text-xs h-6 px-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange(null);
                                setPreviewData(null);
                              }}
                            >
                              Remove file
                            </Button>
                          </div>
                          <div className="mt-3 flex flex-col gap-y-1">
                            <FormLabel>
                              Previewing Data to be Imported.
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Below is a snapshot of the data, showing up to
                              first 20 rows.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          {...getRootProps()}
                          className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col justify-center items-center h-48 gap-y-2"
                        >
                          <input {...getInputProps()} />
                          <p className="text-sm italic w-sm text-center">
                            Drag and drop a CSV file here, or click to select a
                            CSV file. Max size: {AppConfig.MAX_FILE_SIZE_MB}MB
                          </p>
                          <CloudUpload className="text-primary" />
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {previewData && (
          <div className="overflow-auto mx-6">
            <Table
              className="overflow-clip relative"
              divClassName="max-h-40 h-40 overflow-y-auto rounded-md border"
            >
              <TableHeader>
                <TableRow className="sticky top-0 bg-muted z-10 hover:bg-muted">
                  {previewData.headers.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.rows.map((row, index) => (
                  <TableRow key={index}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <DialogFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isExecuting}
            loading={isExecuting}
          >
            Create new file
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewFile;
