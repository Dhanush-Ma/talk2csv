import Logo from "@/components/shared/Logo";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-sm sm:text-base">
      <Logo
        transparent
        className="mb-6 mx-auto md:mx-0"
        width={80}
        height={80}
      />
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Talk2CSV respects your privacy. This policy outlines how we collect,
        use, and protect your information when you use our service.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Data Collection</h2>
      <p className="mb-4">
        We collect uploaded CSV files, user account data (email), and
        interaction logs to improve our service. We do not share or sell your
        data to third parties.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. File Security</h2>
      <p className="mb-4">
        All uploaded files are encrypted in transit and at rest. Files are
        processed using secure infrastructure and deleted upon user request.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Use of LLMs</h2>
      <p className="mb-4">
        Our application uses Google Gemini models to provide answers. Claude and
        OpenAI models are on our roadmap. Only the relevant content is sent to
        LLM providers during query processing.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">
        We use cookies to manage sessions and preferences. You can opt out in
        your browser settings.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can request data deletion, access, or export at any time by
        contacting support.
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
}
