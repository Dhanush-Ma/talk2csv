import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { ChartPie, MessageSquareText, Upload, User } from "lucide-react";
import { AnimatedList, AnimatedListItem } from "../magicui/animated-list";
import { ShimmerButton } from "../magicui/shimmer-button";
import Logo from "../shared/Logo";
import { AnimatedBeamMultipleOutputDemo } from "./Beam";

const files = [
  {
    name: "sales_report.csv",
    body: "Monthly sales data for Q1 2025 across all regional branches including revenue, units sold, and sales targets.",
  },
  {
    name: "employee_directory.csv",
    body: "List of company employees including names, departments, job titles, and contact information.",
  },
  {
    name: "marketing_campaigns.csv",
    body: "Performance metrics for digital marketing campaigns such as CTR, conversion rates, and ad spend.",
  },
  {
    name: "customer_feedback.csv",
    body: "Aggregated feedback from users including ratings, comments, and customer sentiment scores.",
  },
  {
    name: "website_traffic.csv",
    body: "Analytics data for site traffic, user sessions, bounce rates, and popular landing pages.",
  },
  {
    name: "product_inventory.csv",
    body: "Current stock levels, SKU details, product descriptions, and reorder thresholds.",
  },
  {
    name: "financial_summary.csv",
    body: "Quarterly income statement including revenue, expenses, profits, and EBITDA calculations.",
  },
  {
    name: "project_timeline.csv",
    body: "Milestones, deadlines, and task assignments for ongoing internal projects.",
  },
  {
    name: "research_data.csv",
    body: "Experimental results and observation logs from the latest product usability study.",
  },
  {
    name: "support_tickets.csv",
    body: "List of customer support cases including timestamps, issue categories, and resolution status.",
  },
];

const chatConversation = [
  {
    role: "assistant",
    content:
      "Looks like you’ve uploaded **HR Sales Report 2025 - Acme.Inc**. What would you like to know?",
  },
  {
    role: "user",
    content: "Show me the top-performing sales reps.",
  },
  {
    role: "assistant",
    content: `Here are the top 3 sales representatives based on total sales in 2025:\n\n1. **Jane Doe** – $1.2M\n2. **Michael Tan** – $1.08M\n3. **Lina Reyes** – $965K\n\nWould you like me to break this down by region or quarter?`,
  },
  {
    role: "user",
    content: "Yes, by region please.",
  },
  {
    role: "assistant",
    content: `Sure! Here's the breakdown of top performers by region:\n\n- **North America:** Jane Doe – $1.2M\n- **Europe:** Lina Reyes – $965K\n- **Asia-Pacific:** Arjun Patel – $890K\n\nLet me know if you want this as a chart.`,
  },
  {
    role: "user",
    content: "Show it as a bar chart.",
  },
  {
    role: "assistant",
    content:
      "✅ Done! Here’s a bar chart comparing top sales reps by region. 📊",
  },
  {
    role: "user",
    content: "What’s the average monthly sales per rep?",
  },
  {
    role: "assistant",
    content:
      "The average monthly sales per rep in 2025 is approximately **$87,500**.\n\nWould you like to filter this by department or tenure?",
  },
];

const features = [
  {
    Icon: Upload,
    name: "Upload your files",
    description:
      "We will convert them to a searchable SQL database. No worries your data is secured.",
    href: "/signup",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col text-wrap">
                <figcaption className="text-sm font-medium dark:text-white text-wrap">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: MessageSquareText,
    name: "Chat with your data",
    description:
      "Ask questions in plain English and get answers from your CSV files instantly.",
    href: "/signup",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedList className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90">
        {chatConversation.map((message, idx) => (
          <AnimatedListItem key={idx}>
            <div className="flex flex-row items-center gap-2">
              <div className="flex gap-2 items-start">
                <div className="shrink-0 mt-0.5">
                  {message.role === "assistant" ? (
                    <Logo transparent className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <figcaption className="text-sm font-medium dark:text-white ">
                  {message.content}
                </figcaption>
              </div>
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    ),
  },
  {
    Icon: ChartPie,
    name: "Instant visualizations",
    description:
      "Turn your CSV queries into clear bar charts, line graphs, and more — no setup needed.",
    href: "/signup",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-3 h-[300px]",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[200px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
];

const Features = () => {
  return (
    <div id="features" className="max-w-3xl mx-auto mt-80">
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
        <div
          className={cn(
            "group relative col-span-3 flex h-max justify-between items-center overflow-hidden rounded-4xl p-6",
            "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}
        >
          <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 ">
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              Let’s get you talking to your data
            </h3>
            <p className="max-w-lg text-neutral-400">
              Turn spreadsheets into conversations.
            </p>
          </div>
          <a href="/signup">
            <ShimmerButton shimmerColor="#FFFFFF" background="#6366f1">
              <p className="text-primary-foreground">Get started</p>
            </ShimmerButton>
          </a>
          <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </div>
      </BentoGrid>
    </div>
  );
};

export default Features;
