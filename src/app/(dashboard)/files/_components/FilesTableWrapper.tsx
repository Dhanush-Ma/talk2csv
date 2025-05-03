import { createClient } from "@/lib/supabase/server";
import { fetchUserFiles } from "@/services/actions/files.actions";
import React from "react";
import FilesTable from "./FilesTable";

const FilesTableWrapper = async () => {
  const client = await createClient();
  const {
    data: { user: loggedInUser },
  } = await client.auth.getUser();

  const result = await fetchUserFiles({
    userId: loggedInUser!.id,
  });

  return (
    <FilesTable
      files={result?.data?.data || []}
      fetchError={
        result?.data?.status === "error" ? result?.data?.message : null
      }
    />
  );
};

export default FilesTableWrapper;
