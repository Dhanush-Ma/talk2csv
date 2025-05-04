import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTriggerMobile } from "@/components/ui/sidebar";
import { fetchUserFile } from "@/services/actions/files.actions";
import { redirect } from "next/navigation";
import ArchiveFile from "../../_components/ArchiveFile";
import FileDataTable from "./_components/FileDataTable";

const Page = async ({ params }: { params: Promise<{ fileId: string }> }) => {
  const { fileId } = await params;
  const result = await fetchUserFile({ fileId });
  const file = result?.data?.data;

  if (result?.data?.status === "error" || !file) {
    redirect("/files");
  }

  return (
    <div>
      <div className="content-padding-x content-padding-y border-b w-full flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTriggerMobile className="mr-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/files">File Library</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{file.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <ArchiveFile fileId={file.id} tableName={file.tableName} />
        </div>
      </div>
      <FileDataTable tableName={file.tableName} />
    </div>
  );
};

export default Page;
