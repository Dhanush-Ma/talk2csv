import { ArrowDown } from "lucide-react";
import { useStickToBottomContext } from "use-stick-to-bottom";
import { Button } from "../ui/button";

const ScrollToBottom = () => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  return (
    !isAtBottom && (
      <Button
        onClick={() => scrollToBottom()}
        variant="outline"
        size={"icon"}
        className="rounded-full absolute -top-13 shadow-md left-1/2 -translate-x-1/2"
      >
        <ArrowDown />
      </Button>
    )
  );
};

export default ScrollToBottom;
