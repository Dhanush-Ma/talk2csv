import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const client = await createClient();
  const { data } = await client.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <p>Landing Page</p>
      <p>{data.user?.email}</p>
    </div>
  );
}
