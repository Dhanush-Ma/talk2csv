import Logo from "@/components/shared/Logo";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-sm sm:text-base">
      <Logo
        transparent
        className="mb-6 mx-auto md:mx-0"
        width={80}
        height={80}
      />
      <h1 className="text-2xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to Talk2CSV. By accessing or using our application, you agree to
        be bound by these Terms and Conditions. If you disagree with any part,
        you may not access the service.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
      <p className="mb-4">
        Talk2CSV allows you to upload CSV files and interact with your data
        through natural language queries. You agree to use the service for
        lawful purposes only.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Account Responsibility
      </h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account
        and password. Talk2CSV is not liable for any loss or damage from
        unauthorized use.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. AI Models</h2>
      <p className="mb-4">
        We use models provided by Google Gemini and have plans to support Claude
        and OpenAI. You agree not to misuse AI-generated content.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your access at any time,
        without prior notice, for conduct that we believe violates these Terms.
      </p>
      <p className="mt-6 text-gray-500">Last updated: June 2025</p>
      <Link
        className={buttonVariants({
          variant: "secondary",
          className: "mt-8",
        })}
        href={"/"}
      >
        <ArrowLeft className="mr-2" />
        Back to App
      </Link>
    </div>
  );
};

export default page;
