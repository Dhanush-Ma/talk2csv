import { ReactNode } from "react";
import { useStickToBottomContext } from "use-stick-to-bottom";

export function StickyToBottomContent(props: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  footer?: ReactNode;
}) {
  const context = useStickToBottomContext();
  return (
    <div
      ref={context.scrollRef}
      style={{ width: "100%", height: "100%" }}
      className={props.className}
    >
      <div ref={context.contentRef} className={props.contentClassName}>
        {props.children}
      </div>

      {props.footer}
    </div>
  );
}
