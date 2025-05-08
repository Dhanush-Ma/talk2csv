"use client";

import { Input } from "@/components/ui/input";
import { AppConfig } from "@/lib/config";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchFiles = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = React.useState(searchParams.get("q") || "");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl);
    }, AppConfig.DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timeout); // Cleanup previous timeout
  }, [query, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="content-padding-x content-padding-y">
      <div className="flex items-center justify-between  border rounded-md lg:max-w-sm h-9 overflow-hidden">
        <Search
          className="text-muted-foreground border-r h-full bg-muted px-2"
          size={36}
        />
        <Input
          placeholder="Search for files, tags..."
          className="border-0 focus-visible:ring-0 focus-visible:outline-none shadow-none px-0 pl-2"
          onChange={handleSearch}
          value={query}
        />
        {query && (
          <button
            className="text-muted-foreground border-l h-full bg-muted px-2"
            onClick={clearSearch}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFiles;
