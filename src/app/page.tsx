import { AppConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const client = await createClient();
  const { data } = await client.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <p>Landing Page</p>
      <p>{data.user?.email}</p>
      <Link href={AppConfig.DEFAULT_ROUTE}>Go to app</Link>
    </div>
  );
}
