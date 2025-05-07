import ChatInput from "@/app/(dashboard)/chat/_components/ChatInput";
import { ReactNode } from "react";
import { useStickToBottomContext } from "use-stick-to-bottom";

export function StickyToBottomContent(props: {
  content: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const context = useStickToBottomContext();
  return (
    <div
      ref={context.scrollRef}
      style={{ width: "100%", height: "100%" }}
      className={props.className}
    >
      <div ref={context.contentRef} className={props.contentClassName}>
        {props.content}
      </div>

      <div className="sticky bottom-0 flex flex-col items-center bg-background">
        <ChatInput />
      </div>
    </div>
  );
}
