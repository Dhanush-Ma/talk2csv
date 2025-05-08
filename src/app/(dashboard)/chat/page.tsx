/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilesStore } from "@/store/files.store";
import { fetchUserFiles } from "@/services/actions/files.actions";
import { createClient } from "@/lib/supabase/client";
import { Loader } from "@/components/ui/loader";
import Image from "next/image";
import BannerImg from "@/assets/select-banner.png";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { createNewChat } from "@/services/actions/chat.actions";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";

const NewChatPage = () => {
  const router = useRouter();
  const client = useQueryClient();
  const { execute, isExecuting } = useAction(createNewChat, {
    onError: () => {
      toast.error(ERROR_MESSAGES.CHAT_CREATION_FAILED);
    },
    onSuccess: ({ data }) => {
      if (data?.status === "success") {
        setSelectedFile(null);
        setOpen(false);
        router.push(`/chat/${data.data.chatId}`);
        client.invalidateQueries({
          queryKey: ["chats"],
        });
      } else {
        toast.error(ERROR_MESSAGES.CHAT_CREATION_FAILED);
      }
    },
  });
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const { files, isFilesFetched, setFiles, setIsFilesFetched } =
    useFilesStore();

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const client = createClient();
        const {
          data: { user: loggedInUser },
        } = await client.auth.getUser();
        const result = await fetchUserFiles({
          userId: loggedInUser!.id,
        });

        if (result?.data?.status === "success") {
          setFiles(result.data.data);
        } else {
          setFiles([]);
        }

        setIsFilesFetched(true);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (!isFilesFetched) {
      fetchFiles();
    }
  }, [isFilesFetched]);

  const handleCreateChat = () => {
    execute({
      fileId: selectedFile!,
    });
  };

  return (
    <div className="flex flex-col justify-center h-screen w-full">
      <div className="space-y-5 bg-gradient-to-t from-primary/20 to-primary/40 p-4 rounded-md shadow-lg chat-size mx-auto">
        <div className="flex items-center gap-x-4">
          <Image
            src={BannerImg}
            alt="Select a file to get started"
            width={100}
            height={100}
          />
          <div>
            <h2 className="text-xl font-semibold">
              Select a file to get started
            </h2>
            <p className="text-sm text-mute">
              To begin a conversation, please select a CSV file from your Data
              Vault. Talk2CSV will use the selected file to generate insights,
              answer your questions, and help you interact with your data
              effortlessly.
            </p>
          </div>
        </div>
        <div className="flex gap-x-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedFile
                  ? files.find((f) => f.id === selectedFile)?.name
                  : "Select a file..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  disabled={!isFilesFetched}
                  placeholder="Search for a file..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>
                    {isFilesFetched ? (
                      "No files found."
                    ) : (
                      <Loader className="fill-foreground mx-auto" />
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    {files.map((f) => (
                      <CommandItem
                        key={f.id}
                        value={f.id}
                        onSelect={(currentValue) => {
                          setSelectedFile(currentValue);
                          setOpen(false);
                        }}
                      >
                        {f.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedFile === f.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            disabled={!selectedFile || isExecuting}
            loading={isExecuting}
            className="w-[200px]"
            onClick={handleCreateChat}
          >
            Continue
            {!isExecuting && <ArrowRight />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewChatPage;
