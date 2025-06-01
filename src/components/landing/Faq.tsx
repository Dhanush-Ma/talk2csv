import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

export const faqs = [
  {
    question: "What is Talk2CSV?",
    answer:
      "Talk2CSV is an AI-powered interface that lets you explore your CSV data using natural language — no code or formulas needed.",
  },
  {
    question: "Is Talk2CSV free to use?",
    answer:
      "Yes, Talk2CSV is completely free during our beta release. You can upload and interact with an unlimited number of CSV files.",
  },
  {
    question: "Do I need coding or SQL knowledge?",
    answer:
      "No. You can simply ask natural language questions like “What’s the top-selling product?” and get instant insights.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Currently, Talk2CSV supports `.csv` files. Support for Excel and Google Sheets is planned for future updates.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Files are securely processed and not stored permanently. We do not use your data for any training purposes.",
  },
  {
    question: "Which AI models does Talk2CSV use?",
    answer:
      "Talk2CSV currently uses Google Gemini models. OpenAI's GPT and Anthropic's Claude are on our roadmap.",
  },
  {
    question: "Can I choose the AI model?",
    answer:
      "Not at the moment. The system automatically uses the best available model. Model selection will be customizable in the future.",
  },
  {
    question: "How large can my CSV file be?",
    answer:
      "The platform is optimized for fast queries on files with tens of thousands of rows. Support for even larger files is in progress.",
  },
  {
    question: "Does Talk2CSV support visualizations?",
    answer:
      "Yes. Depending on your question, Talk2CSV can generate pie charts, bar graphs, and summary visuals automatically.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Not yet, but API access is planned for a future release. It will allow programmatic queries and integration into your own tools.",
  },
];

const Faq = () => {
  return (
    <div className="my-50 flex items-start gap-4 w-[70%] mx-auto" id="faqs">
      <h2 className="text-7xl">Frequetly Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f) => (
          <AccordionItem
            value={f.question}
            key={f.question}
            className="px-4 border-0 data-[state=open]:border border-dashed border-primary rounded-lg data-[state=open]:bg-primary/10"
          >
            <AccordionTrigger className="group text-xl">
              <div className="flex gap-2 items-center">
                <X
                  id="faq-tag-icon"
                  className="transition-transform duration-300 group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-45"
                />
                {f.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-balance text-lg">
              <p>{f.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
