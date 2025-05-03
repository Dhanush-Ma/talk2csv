import InfoTooltip from "@/components/shared/InfoTooltip";
import { SidebarTriggerMobile } from "@/components/ui/sidebar";
import AddNewFile from "./_components/AddNewFile";
import SearchFiles from "./_components/SearchFiles";
import { Suspense } from "react";
import FilesTableWrapper from "./_components/FilesTableWrapper";
import LoadingTable from "@/components/shared/LoadingTable";

const page = async () => {
  return (
    <div>
      <div className="content-padding-x content-padding-y border-b w-full flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTriggerMobile className="mr-2" />
          <h2 className="font-bold text-xl leading-0 mr-2">File Library</h2>
          <InfoTooltip
            text="Your uploaded CSV files, ready to explore or chat with."
            side="right"
          />
        </div>
        <AddNewFile />
      </div>
      <SearchFiles />
      <Suspense
        fallback={
          <div className="content-margin-x">
            <div className="border rounded-md min-h-[calc(100dvh-12rem)] overflow-auto">
              <LoadingTable />
            </div>
          </div>
        }
      >
        <FilesTableWrapper />
      </Suspense>
    </div>
  );
};

export default page;
