import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";
import { fetchUser } from "@/services/actions/user.actions";
import { AppConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

const OnboardingPage = async () => {
  const client = await createClient();
  const {
    data: { user: loggedInUser },
  } = await client.auth.getUser();

  // User is not logged in yet
  if (!loggedInUser) {
    redirect("/login");
  }

  const result = await fetchUser({ id: loggedInUser.id });
  const user = result?.data?.data;

  // User onboarding is completed
  if (user) {
    redirect(AppConfig.homeRoute);
  }

  return <OnboardingForm loggedInUser={loggedInUser} />;
};

export default OnboardingPage;
